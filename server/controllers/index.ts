import SignController from "./signController";
import userinfoController from "./userinfoController";
import PostsController from "./postsController";
import feedsController from "./feedsController";
import LikesHandler from "./likesController";
import CommentsHandler from "./commentsController";

module.exports = {
    signup: SignController.signup,
    login: SignController.login,
    logout: SignController.logout,
    emailAuthentication: SignController.emailAuthentication,
    modifyUserInfo: userinfoController.modifyUserInfo,
    withdrawal: userinfoController.withdrawal,
    getPost: PostsController.getPost,
    createPost: PostsController.createPost,
    modifyPost: PostsController.modifyPost,
    deletePost: PostsController.deletePost,
    getTotalFeed: feedsController.getTotalFeed,
    getUserFeed: feedsController.getUserFeed,
    addLike: LikesHandler.addLike,
    cancelLike: LikesHandler.cancelLike,
    createComment: CommentsHandler.createComment,
    modifyComment: CommentsHandler.modifyComment,
    deleteComment: CommentsHandler.deleteComment,
    getComments: CommentsHandler.getComments
};