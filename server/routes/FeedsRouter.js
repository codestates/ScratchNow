const express = require('express');
const router = express.Router();
const feedsController = require('../controllers/FeedsController');

router.get('/byDate', feedsController.getAllFeedsByDate);
router.get('/byLikes', feedsController.getAllFeedsByLikes);
router.get('/:userId', feedsController.getUserFeeds);
router.get('/follow/:userId', feedsController.getFollowingFeeds);

module.exports = router;