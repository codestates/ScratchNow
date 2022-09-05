import express, { Request, Response } from 'express';
import { Comments } from '../models/comments';
import { tokenAuthentication } from './tokenFunctions';
import { Posts } from '../models/posts';

const commentsController = {
  createComment: async (req: Request, res: Response) => {
    const { user_id, post_id, text, anonymity_yn } = req.body;

    await Comments.create({ user_id, post_id, anonymity_yn, text }).then(
      (data) => {
        res
          .status(201)
          .json({ postData: data, message: `Created the comment` });
      },
    );
  },

  modifyComment: async (req: Request, res: Response) => {
    const tokenValidity = tokenAuthentication(req);
    const { id, text, anonymity_yn } = req.body;

    if (!tokenValidity) {
      res.status(404).json({ message: 'Invalid Token' });
    } else {
      try {
        await Posts.update({ text }, { where: { id } }).then(() => {
          res.status(200).json({ message: `Modified the comment` });
        });
      } catch (err) {
        res.status(404).json({ message: 'Invalid comment id' });
      }
    }
  },

  deleteComment: async (req: Request, res: Response) => {},

  getComments: async (req: Request, res: Response) => {},
};

export default commentsController;
