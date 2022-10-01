import { Request, Response } from 'express';
import { User } from '../models/user';
import { generateAccessToken, sendAuthNumber } from './authFunctions';
import { google } from 'googleapis';
import * as bcrypt from 'bcrypt';
import axios from 'axios';

const SALT_ROUND = 4;

const signController = {
  signup: async (req: Request, res: Response) => {
    const { email, password, nickname } = req.body;
    const emailValidity = await User.findOne({ where: { email } });
    const nicknameValidity = await User.findOne({ where: { nickname } });

    if (emailValidity) {
      const dataValues = emailValidity.get({ plain: true });
      const signType = dataValues.sign_type;

      if (signType == 1) {
        res.status(400).json({ message: 'Email already exists with Kakao' });
      } else if (signType == 2) {
        res.status(400).json({ message: 'Email already exists with Google' });
      } else {
        res.status(400).json({ message: 'Email already exists with JWT' });
      }
    } else if (nicknameValidity) {
      res.status(400).json({ message: 'Nickname already exists' });
    } else {
      const salt = await bcrypt.genSalt(SALT_ROUND);
      const hashedPassword = await bcrypt.hash(password, salt);

      await User.create({
        email,
        password: hashedPassword,
        nickname,
        sign_type: 0,
      }).then(() => {
        res.status(201).json({ message: `Created the user ${nickname}` });
      });
    }
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userinfo = await User.findOne({ where: { email } });

    if (!userinfo) {
      res.status(404).json({ message: `No user data with email: ${email}` });
    } else {
      const dataValues = userinfo.get({ plain: true });
      const signType = dataValues.sign_type;
      const hashedPassword = dataValues.password;
      const passwordValidity = bcrypt.compare(password, <string>hashedPassword);

      if (signType !== 0) {
        res.status(404).json({ message: `Email is registered with OAuth` });
      } else if (!passwordValidity) {
        res.status(403).json({ message: `Wrong password` });
      } else {
        const payload = {
          id: dataValues.id,
          email: dataValues.email,
          nickname: dataValues.nickname,
        };
        const accessToken = generateAccessToken(payload);

        res
          .cookie('jwt', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
          })
          .status(200)
          .json({
            message: `Login success with email: ${email}`,
          });
      }
    }
  },

  logout: async (req: Request, res: Response) => {
    res
      .clearCookie('jwt', {
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

        await User.findOrCreate({
          where: {
            email: userinfo.data.kakao_account.email,
            sign_type: 1,
          },
        }).then((data) => {
          res.status(200).json({
            userdata: { data, accessToken },
            message: 'Kakao login result',
          });
        });
      } else {
        res.status(400).json({ message: 'No access token from Kakao' });
      }
    } catch (err) {
      res.json(err);
    }
  },

  googleOAuth: async (req: Request, res: Response) => {
    const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

    const config: any = {
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      response_type: 'code',
      scope: process.env.GOOGLE_OAUTH_SCOPE,
      state: 'google',
    };

    const params = new URLSearchParams(config).toString();
    res.redirect(`${baseUrl}?${params}`);
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

        await User.findOrCreate({
          where: {
            email: userinfo.data.email,
            sign_type: 2,
          },
        }).then((data) => {
          res.status(200).json({
            userdata: { data, tokens },
            message: 'Google login result',
          });
        });
      } else {
        res.status(400).json({ message: 'No token from Google' });
      }
    } catch (err) {
      res.json(err);
    }
  },

  emailAuthentication: async (req: Request, res: Response) => {
    const { email } = req.body;

    await sendAuthNumber(email, res);
  },
};

export default signController;
