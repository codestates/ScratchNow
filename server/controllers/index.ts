import SignController from './signController';
import UserinfoController from './userinfoController';
import PostsController from './postsController';
import FeedsController from './feedsController';
import LikesController from './likesController';
import commentsController from './commentsController';

module.exports = {
  signup: SignController.signup,
  login: SignController.login,
  logout: SignController.logout,
  emailAuthentication: SignController.emailAuthentication,
  modifyUserInfo: UserinfoController.modifyUserInfo,
  withdrawal: UserinfoController.withdrawal,
  getPost: PostsController.getPost,
  createPost: PostsController.createPost,
  modifyPost: PostsController.modifyPost,
  deletePost: PostsController.deletePost,
  getTotalFeedByDate: FeedsController.getTotalFeedByDate,
  getTotalFeedByLikes: FeedsController.getTotalFeedByLikes,
  getUserFeed: FeedsController.getUserFeed,
  addLike: LikesController.addLike,
  cancelLike: LikesController.cancelLike,
  createComment: commentsController.createComment,
  modifyComment: commentsController.modifyComment,
  deleteComment: commentsController.deleteComment,
  getComments: commentsController.getComments,
};
