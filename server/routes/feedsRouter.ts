import { Router } from 'express';
import FeedsController from '../controllers/feedsController';

const router = Router();

router.get('/feed/date', FeedsController.getTotalFeedByDate);
router.get('/feed/likes', FeedsController.getTotalFeedByLikes);
router.get('/feed/user', FeedsController.getUserFeed);

export default router;
