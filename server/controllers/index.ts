import SignController from "./signController";
import userinfoController from "./userinfoController";
import PostsHandler from "./postsController";
import FeedsHandler from "./feedsController";
import LikesHandler from "./likesController";
import CommentsHandler from "./commentsController";

module.exports = {
    signup: SignController.signup,
    login: SignController.login,
    logout: SignController.logout,
    emailAuthentication: SignController.emailAuthentication,
    modifyUserInfo: userinfoController.modifyUserInfo,
    withdrawal: userinfoController.withdrawal,
    getPost: PostsHandler.getPost,
    createPost: PostsHandler.createPost,
    modifyPost: PostsHandler.modifyPost,
    deletePost: PostsHandler.deletePost,
    getTotalFeed: FeedsHandler.getTotalFeed,
    getUserFeed: FeedsHandler.getUserFeed,
    addLike: LikesHandler.addLike,
    cancelLike: LikesHandler.cancelLike,
    createComment: CommentsHandler.createComment,
    modifyComment: CommentsHandler.modifyComment,
    deleteComment: CommentsHandler.deleteComment,
    getComments: CommentsHandler.getComments
};