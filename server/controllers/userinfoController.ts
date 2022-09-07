import { Request, Response } from 'express';
import { Users } from '../models/users';
import { Posts } from '../models/posts';
import * as bcrypt from 'bcrypt';
import { tokenAuthentication } from './tokenFunctions';

const SALT_ROUND = 4;

const userinfoController = {
  getUserInfo: async (req: Request, res: Response) => {
    const { id } = req.body;

    await Users.findOne({
      where: id,
      attributes: ['id', 'nickname', 'profile_image_url', 'status_message'],
    }).then(async (userData) => {
      const postCount = await Posts.count({ where: { user_id: id } });

      res.status(200).json({
        data: { userData, postCount },
        message: `User information of the user ${id}`,
      });
    });
  },

  deleteProfileImage: async (req: Request, res: Response) => {
    const tokenValidity = tokenAuthentication(req);
    const { id } = req.body;

    if (!tokenValidity) {
      res.status(404).json({ message: 'Invalid Token' });
    } else {
      await Users.update({ profile_image_url: '' }, { where: id }).then(() => {
        res
          .status(200)
          .json({ message: `Deleted the profile image of user ${id}` });
      });
    }
  },

  checkNickname: async (req: Request, res: Response) => {
    const tokenValidity = tokenAuthentication(req);
    const { nickname } = req.body;
    const nicknameValidity = await Users.findOne({ where: { nickname } });

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
      await Users.update(
        { profile_image_url, nickname, status_message },
        { where: id },
      ).then(() => {
        res
          .status(200)
          .json({ message: `Updated user information of user ${id}` });
      });
    }
  },

  updatePassword: async (req: Request, res: Response) => {
    const tokenValidity = tokenAuthentication(req);
    const { id, password } = req.body;

    if (!tokenValidity) {
      res.status(404).json({ message: 'Invalid Token' });
    } else {
      const salt = await bcrypt.genSalt(SALT_ROUND);
      const hashedPassword = await bcrypt.hash(password, salt);

      await Users.update({ password: hashedPassword }, { where: id }).then(
        () => {
          res
            .status(200)
            .json({ message: `Changed the password of user ${id}` });
        },
      );
    }
  },

  // 비밀번호 검증 포함? 프론트와 협의 후 픽스
  withdrawal: async (req: Request, res: Response) => {
    const tokenValidity = tokenAuthentication(req);
    const { id, email, password } = req.body;

    if (!tokenValidity) {
      res.status(404).json({ message: 'Invalid Token' });
    } else {
      await Users.destroy({ where: { id } }).then(() => {
        res.status(200).json({ message: `Soft deleted the account ${email}` });
      });
    }
  },
};

export default userinfoController;
