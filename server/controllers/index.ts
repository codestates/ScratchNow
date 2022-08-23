import SignHandler from "./signController";
import UserinfoHandler from "./userinfoController";
import PostsHandler from "./postsController";
import FeedsHandler from "./feedsController";
import LikesHandler from "./likesController";
import CommentsHandler from "./commentsController";

module.exports = {
    signup: SignHandler.signup,
    login: SignHandler.login,
    logout: SignHandler.logout,
    emailAuthentication: SignHandler.emailAuthentication,
    modifyUserInfo: UserinfoHandler.modifyUserInfo,
    withdrawal: UserinfoHandler.withdrawal,
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