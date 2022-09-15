import { Request, Response } from 'express';
import { Posts } from '../models/posts';
import { Users } from '../models/users';

const feedsController = {
  getTotalFeedByDate: async (req: Request, res: Response) => {
    await Posts.findAll({
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
          model: Users,
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
    await Posts.findAll({
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
          model: Users,
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

    await Posts.findAll({
      where: { user_id: Number(id) },
      order: [['created_at', 'DESC']],
      attributes: ['id', 'painting_url', 'total_likes', 'created_at'],
    }).then((data) => {
      res.status(200).json({
        data: data,
        message: `Feed and profile of user ${id}`,
      });
    });
  },
};

export default feedsController;
