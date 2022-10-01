import { Request, Response } from 'express';
import { Post } from '../models/post';
import { User } from '../models/user';

const feedsController = {
  getTotalFeedByDate: async (req: Request, res: Response) => {
    await Post.findAll({
      order: [['created_at', 'DESC']],
      attributes: [
        'id',
        'painting_url',
        'user_id',
        'total_likes',
        'created_at',
      ],
      include: [
        {
          model: User,
          as: 'userHasManyPosts',
          attributes: ['id', 'nickname', 'profile_image_url'],
        },
      ],
    }).then((data) => {
      res.status(200).json({
        feedData: data,
        message: 'All posts of our service listed by date',
      });
    });
  },

  getTotalFeedByLikes: async (req: Request, res: Response) => {
    await Post.findAll({
      order: [
        ['total_likes', 'DESC'],
        ['created_at', 'DESC'],
      ],
      attributes: [
        'id',
        'painting_url',
        'user_id',
        'total_likes',
        'created_at',
      ],
      include: [
        {
          model: User,
          as: 'userHasManyPosts',
          attributes: ['id', 'nickname', 'profile_image_url'],
        },
      ],
    }).then((data) => {
      res.status(200).json({
        feedData: data,
        message: 'All posts of our service listed by likes',
      });
    });
  },

  getUserFeed: async (req: Request, res: Response) => {
    const { id } = req.query;

    await Post.findAll({
      where: { user_id: Number(id) },
      order: [['created_at', 'DESC']],
      attributes: ['id', 'painting_url', 'total_likes', 'created_at'],
    }).then((data) => {
      res.status(200).json({
        feedData: data,
        message: `Feed(posts) of user ${id}`,
      });
    });
  },
};

export default feedsController;
