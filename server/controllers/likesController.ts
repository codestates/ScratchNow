import { Request, Response } from 'express';
import { Likes } from '../models/likes';
import { Posts } from '../models/posts';

const likesController = {
  addLike: async (req: Request, res: Response) => {
    const { user_id, post_id } = req.body;

    await Likes.create({ user_id, post_id })
      .then((data) => {
        Posts.increment({ total_likes: 1 }, { where: { id: post_id } });
      })
      .then(() => {
        res.status(201).json({ message: `Liked the post ${post_id}` });
      });
  },

  cancelLike: async (req: Request, res: Response) => {
    const { user_id, post_id } = req.body;

    await Likes.destroy({ where: { user_id, post_id } })
      .then((data) => {
        Posts.decrement({ total_likes: 1 }, { where: { id: post_id } });
      })
      .then(() => {
        res
          .status(200)
          .json({ message: `Canceled the like of the post ${post_id}` });
      });
  },
};

export default likesController;
