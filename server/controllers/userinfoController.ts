import { Request, Response } from 'express';
import { User } from '../models/user';
import { Post } from '../models/post';
import { Liking } from '../models/liking';
import { tokenAuthentication } from './authFunctions';
import * as bcrypt from 'bcrypt';

const SALT_ROUND = 4;

const userinfoController = {
  getUserInfo: async (req: Request, res: Response) => {
    const { id } = req.query;

    await User.findOne({
      where: { id: Number(id) },
      attributes: ['id', 'nickname', 'profile_image_url', 'status_message'],
    }).then(async (userData) => {
      const postCount = await Post.count({ where: { user_id: Number(id) } });

      res.status(200).json({
        data: { userData, postCount },
        message: `User information of the user ${id}`,
      });
    });
  },

  deleteProfileImage: async (req: Request, res: Response) => {
    const tokenValidity = tokenAuthentication(req);
    const { user_id } = req.body;

    if (!tokenValidity) {
      res.status(404).json({ message: 'Invalid Token' });
    } else {
      await User.update(
        { profile_image_url: '' },
        { where: { id: user_id } },
      ).then(() => {
        res
          .status(200)
          .json({ message: `Deleted the profile image of user ${user_id}` });
      });
    }
  },

  checkNickname: async (req: Request, res: Response) => {
    const tokenValidity = tokenAuthentication(req);
    const { nickname } = req.query;
    const nicknameValidity = await User.findOne({
      where: { nickname: String(nickname) },
    });

    if (!tokenValidity) {
      res.status(404).json({ message: 'Invalid Token' });
    } else if (nicknameValidity) {
      res.status(404).json({ message: 'Nickname already exists' });
    } else {
      res.status(200).json({ message: `Nickname ${nickname} is available` });
    }
  },

  updateUserInfo: async (req: Request, res: Response) => {
    const tokenValidity = tokenAuthentication(req);
    const { id, profile_image_url, nickname, status_message } = req.body;

    if (!tokenValidity) {
      res.status(404).json({ message: 'Invalid Token' });
    } else {
      await User.update(
        { profile_image_url, nickname, status_message },
        { where: { id } },
      ).then(() => {
        res
          .status(200)
          .json({ message: `Updated user information of user ${id}` });
      });
    }
  },

  updatePassword: async (req: Request, res: Response) => {
    const tokenValidity = tokenAuthentication(req);
    const { user_id, password } = req.body;

    if (!tokenValidity) {
      res.status(404).json({ message: 'Invalid Token' });
    } else {
      const salt = await bcrypt.genSalt(SALT_ROUND);
      const hashedPassword = await bcrypt.hash(password, salt);

      await User.update(
        { password: hashedPassword },
        { where: { id: user_id } },
      ).then(() => {
        res
          .status(200)
          .json({ message: `Changed the password of user ${user_id}` });
      });
    }
  },

  withdrawal: async (req: Request, res: Response) => {
    const tokenValidity = tokenAuthentication(req);
    const { id, email } = req.query;

    if (!tokenValidity) {
      res.status(404).json({ message: 'Invalid Token' });
    } else {
      await User.destroy({ where: { id: Number(id) } })
        .then(() => {
          Post.destroy({ where: { user_id: Number(id) } });
          Liking.destroy({ where: { user_id: Number(id) } });
        })
        .then(() => {
          res.status(200).json({ message: `Soft deleted the account ${id}` });
        });
    }
  },
};

export default userinfoController;
