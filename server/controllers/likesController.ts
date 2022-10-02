import { Request, Response } from 'express';
import { Liking } from '../models/liking';
import { Post } from '../models/post';
import status from 'http-status';

const likesController = {
  updateLikesCount: async (post_id: number) => {
    await Liking.count({ where: { post_id } }).then((counts) => {
      Post.update({ total_likes: counts }, { where: { id: post_id } });
    });
  },

  addOrCancelLike: async (req: Request, res: Response) => {
    const { user_id, post_id } = req.body;
    const likedOrNot = await Liking.findOne({ where: { user_id, post_id } });

    try {
      if (likedOrNot) {
        await Liking.destroy({ where: { user_id, post_id } })
          .then(() => {
            likesController.updateLikesCount(post_id);
          })
          .then(() => {
            res
              .status(status.OK)
              .json({ message: `Canceled the like of the post ${post_id}` });
          });
      } else {
        await Liking.create({ user_id, post_id })
          .then(() => {
            likesController.updateLikesCount(post_id);
          })
          .then(() => {
            res
              .status(status.CREATED)
              .json({ message: `Liked the post ${post_id}` });
          });
      }
    } catch (err) {
      res.status(status.NOT_FOUND).json({ message: 'Wrong id number requested' });
    }
  },
};

export default likesController;
