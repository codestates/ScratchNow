import { Router } from 'express';
import PostsController from '../controllers/postsController';

const router = Router();

router.get('/', PostsController.getPost);
router.post('/', PostsController.createPost);
router.patch('/', PostsController.modifyPost);
router.delete('/', PostsController.deletePost);

export default router;
