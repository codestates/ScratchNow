import { Router } from 'express';
import UsersRouter from './usersRouter';
import PostsRouter from './postsRouter';
import FeedsRouter from './feedsRouter';
import CommentsRouter from './commentsRouter';
import LikesRouter from './likesRouter';

const API_VER = 'v1';

const routes = Router();

routes.use(`/api/${API_VER}/user`, UsersRouter);
routes.use(`/api/${API_VER}/post`, PostsRouter);
routes.use(`/api/${API_VER}/feed`, FeedsRouter);
routes.use(`/api/${API_VER}/comment`, CommentsRouter);
routes.use(`/api/${API_VER}/like`, LikesRouter);

export default routes;
