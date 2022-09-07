import { Router } from 'express';
import PostsController from '../controllers/postsController';

const router = Router();

router.post('/', PostsController.createPost);
router.patch('/', PostsController.modifyPost);
router.delete('/', PostsController.deletePost);
router.get('/', PostsController.getPost);

export default router;
