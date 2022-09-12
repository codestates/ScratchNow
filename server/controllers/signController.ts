import { Request, Response } from 'express';
import { Users } from '../models/users';
import { generateAccessToken, sendAuthNumber } from './authFunctions';
import { google } from 'googleapis';
import * as bcrypt from 'bcrypt';
import axios from 'axios';

const SALT_ROUND = 4;

const signController = {
  signup: async (req: Request, res: Response) => {
    const { email, password, nickname } = req.body;
    const emailValidity = await Users.findOne({ where: { email } });
    const nicknameValidity = await Users.findOne({ where: { nickname } });

    if (emailValidity) {
      res.status(404).json({ message: 'Email already exists' });
    } else if (nicknameValidity) {
      res.status(404).json({ message: 'Nickname already exists' });
    } else {
      const salt = await bcrypt.genSalt(SALT_ROUND);
      const hashedPassword = await bcrypt.hash(password, salt);

      await Users.create({ email, password: hashedPassword, nickname }).then(
        () => {
          res.status(201).json({ message: `Created the user ${nickname}` });
        },
      );
    }
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userinfo = await Users.findOne({ where: { email } });

    if (!userinfo) {
      res.status(404).json({ message: `No user data with email: ${email}` });
    } else {
      const dataValues = userinfo.get({ plain: true });
      const hashedPassword = dataValues.password;
      const passwordValidity = bcrypt.compare(password, <string>hashedPassword);

      if (!passwordValidity) {
        res.status(404).json({ message: `Wrong password` });
      } else {
        const accessToken = generateAccessToken(dataValues);
        res
          .cookie('jwt', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
          })
          .status(200)
          .json({
            data: { accessToken },
            message: `Login success with email: ${email}`,
          });
      }
    }
  },

  logout: async (res: Response) => {
    res
      .clearCookie('accessToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .status(200)
      .json({ message: 'Logout success' });
  },

  kakaoOAuth: (req: Request, res: Response) => {
    const baseUrl = 'https://kauth.kakao.com/oauth/authorize';

    const config: any = {
      client_id: process.env.KAKAO_CLIENT_ID,
      redirect_uri: process.env.KAKAO_REDIRECT_URI,
      response_type: 'code',
    };

    const params = new URLSearchParams(config).toString();
    res.redirect(`${baseUrl}?${params}`);
  },

  kakaoToken: async (req: Request, res: Response) => {
    const baseUrl = 'https://kauth.kakao.com/oauth/token';
    const config: any = {
      client_id: process.env.KAKAO_CLIENT_ID,
      client_secret: process.env.KAKAO_CLIENT_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: process.env.KAKAO_REDIRECT_URI,
      code: req.query.code,
    };

    const params = new URLSearchParams(config).toString();
    try {
      const kakaoTokenRequest = await axios.post(`${baseUrl}?${params}`, {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      });
      const accessToken = kakaoTokenRequest.data.access_token;

      if (accessToken) {
        const userinfo = await axios.get('https://kapi.kakao.com/v2/user/me', {
          headers: {
            Authorization: `Bearer ${kakaoTokenRequest.data.access_token}`,
          },
        });

        await Users.findOrCreate({
          where: {
            email: userinfo.data.kakao_account.email,
            profile_image_url:
              userinfo.data.kakao_account.profile.profile_image_url,
          },
        }).then((data) => {
          res.status(200).json({
            userdata: { data, accessToken },
            message: 'Kakao login result',
          });
        });
      } else {
        res.json({ message: 'No access token from Kakao' });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  googleOAuth: async (req: Request, res: Response) => {
    res.redirect(
      `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&state=google`,
    );
  },

  googleCallback: async (req: Request, res: Response) => {
    const code = req.query.code;

    try {
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI,
      );

      const { tokens } = await oauth2Client.getToken(<string>code);

      if (tokens) {
        oauth2Client.setCredentials(tokens);

        const userinfo = await axios.get(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokens.access_token}`,
        );

        await Users.findOrCreate({
          where: {
            email: userinfo.data.email,
            profile_image_url: userinfo.data.picture,
          },
        }).then((data) => {
          res.status(200).json({
            userdata: { data, tokens },
            message: 'Google login result',
          });
        });
      } else {
        res.json({ message: 'No token from Google' });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  emailAuthentication: async (req: Request, res: Response) => {
    const { email } = req.body;

    await sendAuthNumber(email, res);
  },
};

export default signController;
