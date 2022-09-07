import { Router } from 'express';
import LikesController from '../controllers/likesController';

const router = Router();

router.post('/', LikesController.addLike);
router.delete('/', LikesController.cancelLike);

export default router;
