import { Request, Response } from 'express';
import { Comments } from '../models/comments';
import { tokenAuthentication } from './authFunctions';

const commentsController = {
  createComment: async (req: Request, res: Response) => {
    const tokenValidity = tokenAuthentication(req);
    const { user_id, post_id, text, anonymity_yn } = req.body;

    if (!tokenValidity) {
      res.status(404).json({ message: 'Invalid Token' });
    } else {
      try {
        await Comments.create({ user_id, post_id, anonymity_yn, text }).then(
          (data) => {
            res
              .status(201)
              .json({ postData: data, message: `Created the comment` });
          },
        );
      } catch (err) {
        res.status(500).json({ message: 'Failed to create comment' });
      }
    }
  },

  modifyComment: async (req: Request, res: Response) => {
    const tokenValidity = tokenAuthentication(req);
    const { comment_id, text, anonymity_yn } = req.body;

    if (!tokenValidity) {
      res.status(404).json({ message: 'Invalid Token' });
    } else {
      try {
        await Comments.update(
          { text, anonymity_yn },
          { where: { id: comment_id } },
        ).then(() => {
          res.status(200).json({ message: `Modified the comment` });
        });
      } catch (err) {
        res.status(500).json({ message: 'Failed to modify comment' });
      }
    }
  },

  deleteComment: async (req: Request, res: Response) => {
    const tokenValidity = tokenAuthentication(req);
    const { comment_id } = req.body;

    if (!tokenValidity) {
      res.status(404).json({ message: 'Invalid Token' });
    } else {
      try {
        await Comments.destroy({ where: { id: comment_id } }).then(() => {
          res.status(200).json({ message: `Soft deleted the comment` });
        });
      } catch (err) {
        res.status(500).json({ message: 'Failed to delete comment' });
      }
    }
  },

  getComments: async (req: Request, res: Response) => {
    const { post_id } = req.body;

    try {
      await Comments.findAll({ where: { post_id } }).then((data) => {
        res
          .status(200)
          .json({ data: data, message: `Comments of post ${post_id}` });
      });
    } catch (err) {
      res.status(500).json({ message: 'Failed giving comments' });
    }
  },
};

export default commentsController;
