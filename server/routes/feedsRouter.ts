import { Router } from 'express';
const {
  getTotalFeedByDate,
  getTotalFeedByLikes,
  getUserFeed,
} = require('../controllers');

const router = Router();

router.get('/feed/date', getTotalFeedByDate);
router.get('/feed/likes', getTotalFeedByLikes);
router.get('/feed/user', getUserFeed);

export default router;
