import { Request, Response } from 'express';
import { Likes } from '../models/likes';
import { Posts } from '../models/posts';

const likesController = {
  updateLikesCount: async (post_id: number) => {
    const totalLikesAfter = await Likes.count({ where: { id: post_id } });
    await Posts.update(
      { total_likes: totalLikesAfter },
      { where: { id: post_id } },
    );
  },

  addOrCancelLike: async (req: Request, res: Response) => {
    const { user_id, post_id } = req.body;
    const likedOrNot = await Likes.findOne({ where: { user_id, post_id } });

    if (likedOrNot) {
      await Likes.destroy({ where: { user_id, post_id } })
        .then(async () => {
          await likesController.updateLikesCount(post_id);
        })
        .then(() => {
          res
            .status(200)
            .json({ message: `Canceled the like of the post ${post_id}` });
        });
    } else {
      await Likes.create({ user_id, post_id })
        .then(async () => {
          await likesController.updateLikesCount(post_id);
        })
        .then(() => {
          res.status(201).json({ message: `Liked the post ${post_id}` });
        });
    }
  },
};

export default likesController;
