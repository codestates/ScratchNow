const express = require('express');
const router = express.Router();
const followController = require('../controllers/FollowController')

router.get('/follower/:userId', followController.getFollower);
router.get('/following/:userId', followController.getFollowing);
router.post('/', followController.followUser);
router.delete('/unfollow', followController.unfollowUser);

module.exports = router;