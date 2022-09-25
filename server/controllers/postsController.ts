import { Request, Response } from 'express';
import { Post } from '../models/post';
import { Comment } from '../models/comment';
import { Liking } from '../models/liking';
import { tokenAuthentication } from './authFunctions';

const postsController = {
  getPost: async (req: Request, res: Response) => {
    const { id } = req.body;

    try {
      await Post.findOne({ where: { id } }).then((data) => {
        res.json({ data: data, message: `Post detail of post id ${id}` });
      });
    } catch (err) {
      res.status(404).json({ message: 'Invalid post id' });
    }
  },

  createPost: async (req: Request, res: Response) => {
    const { painting_url, text, user_id } = req.body;

    await Post.create({ painting_url, text, user_id }).then((data) => {
      res.status(201).json({ postData: data, message: `Created the post` });
    });
  },

  modifyPost: async (req: Request, res: Response) => {
    const tokenValidity = tokenAuthentication(req);
    const { id, painting_url, text } = req.body;

    if (!tokenValidity) {
      res.status(404).json({ message: 'Invalid Token' });
    } else {
      try {
        await Post.update({ painting_url, text }, { where: { id } }).then(
          () => {
            res.status(200).json({ message: `Modified the post` });
          },
        );
      } catch (err) {
        res.status(404).json({ message: 'Invalid post id' });
      }
    }
  },

  deletePost: async (req: Request, res: Response) => {
    const tokenValidity = tokenAuthentication(req);
    const { id } = req.body;

    if (!tokenValidity) {
      res.status(404).json({ message: 'Invalid Token' });
    } else {
      try {
        await Post.destroy({ where: { id } }).then(() => {
          Comment.destroy({ where: { post_id: id } });
          Liking.destroy({ where: { post_id: id } });
        }).then(() => {
          res.status(200).json({ message: `Soft deleted the post` });
        });
      } catch (err) {
        res.status(404).json({ message: 'Invalid post id' });
      }
    }
  },
};

export default postsController;
