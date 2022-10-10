import { Router } from 'express';
import FeedsController from '../controllers/feedsController';

const router = Router();

router.get('/date', FeedsController.getTotalFeedByDate);
router.get('/likes', FeedsController.getTotalFeedByLikes);
router.get('/user', FeedsController.getUserFeed);

export default router;
