import { Router } from 'express';
import UsersRouter from './usersRouter';
import PostsRouter from './postsRouter';
import FeedsRouter from './feedsRouter';
import CommentsRouter from './commentsRouter';
import LikesRouter from './likesRouter';

const routes = Router();

routes.use(`/api/user`, UsersRouter);
routes.use(`/api/post`, PostsRouter);
routes.use(`/api/feed`, FeedsRouter);
routes.use(`/api/comment`, CommentsRouter);
routes.use(`/api/like`, LikesRouter);

export default routes;
