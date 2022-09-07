import { Router } from 'express';
import commentsController from '../controllers/commentsController';

const router = Router();

router.post('/', commentsController.createComment);
router.patch('/', commentsController.modifyComment);
router.delete('/', commentsController.deleteComment);
router.get('/', commentsController.getComments);

export default router;
