import { Request, Response } from 'express';
import { Post } from '../models/post';
import { User } from '../models/user';
import { Comment } from '../models/comment';
import { Liking } from '../models/liking';
import { tokenAuthentication } from './authFunctions';
import status from 'http-status';

const postsController = {
  getPost: async (req: Request, res: Response) => {
    const { id } = req.query;

    try {
      await Post.findOne({
        where: { id: Number(id) },
        include: [
          {
            model: User,
            as: 'userHasManyPosts',
            attributes: ['id', 'nickname', 'profile_image_url'],
          },
        ],
      }).then((data) => {
        if (data === null) {
          res.status(status.NOT_FOUND).json({ message: `Invalid post id` });
        } else {
          res
            .status(status.OK)
            .json({ data: data, message: `Post detail of post id ${id}` });
        }
      });
    } catch (err) {
      res.status(status.NOT_FOUND).json({ message: 'Invalid post id' });
    }
  },

  createPost: async (req: Request, res: Response) => {
    const { painting_url, text, user_id } = req.body;

    await Post.create({ painting_url, text, user_id }).then((data) => {
      res
        .status(status.CREATED)
        .json({ postData: data, message: `Created the post` });
    });
  },

  modifyPost: async (req: Request, res: Response) => {
    const tokenValidity = tokenAuthentication(req);
    const { post_id, painting_url, text } = req.body;

    if (!tokenValidity) {
      res.status(status.UNAUTHORIZED).json({ message: 'Invalid Token' });
    } else {
      try {
        await Post.update(
          { painting_url, text },
          { where: { id: post_id } },
        ).then(() => {
          res
            .status(status.OK)
            .json({ message: `Modified the post ${post_id}` });
        });
      } catch (err) {
        res.status(status.NOT_FOUND).json({ message: 'Invalid post id' });
      }
    }
  },

  deletePost: async (req: Request, res: Response) => {
    const tokenValidity = tokenAuthentication(req);
    const { id } = req.query;

    if (!tokenValidity) {
      res.status(status.UNAUTHORIZED).json({ message: 'Invalid Token' });
    } else {
      await Post.destroy({ where: { id: Number(id) } })
        .then(() => {
          Comment.destroy({ where: { post_id: Number(id) } });
          Liking.destroy({ where: { post_id: Number(id) } });
        })
        .then(() => {
          res
            .status(status.OK)
            .json({ message: `Soft deleted the post ${id}` });
        });
    }
  },
};

export default postsController;
