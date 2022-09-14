import { Router } from 'express';
import LikesController from '../controllers/likesController';

const router = Router();

router.post('/', LikesController.addOrCancelLike);

export default router;
