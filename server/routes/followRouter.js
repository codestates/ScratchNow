const express = require('express');
const router = express.Router();
const followController = require('./../controllers/followController')

router.get('follower', followController.getFollower);
router.get('following', followController.getFollowing);
router.post('/', followController.followUser);
router.delete('/:followId', followController.unFollowUser);

module.exports = router;