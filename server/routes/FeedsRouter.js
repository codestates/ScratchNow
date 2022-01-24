const express = require('express');
const router = express.Router();
const feedsController = require('../controllers/FeedsController');

router.get('/byDate', feedsController.getAllFeedsByDate);
router.get('/byLikes', feedsController.getAllFeedsByLikes);
router.get('/follow', feedsController.getFollowingFeeds);
router.get('/:userId', feedsController.getUserFeeds);

module.exports = router;