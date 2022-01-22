const express = require('express');
const router = express.Router();
const postController = require('./../controllers/postController');

router.get('/:postId', postController.getPostById);
router.get('/feeds', postController.getFeeds);
router.post('/', postController.createPost);
router.patch('/:postId', postController.patchPostById);
router.delete('/:postId', postController.deletePost);

module.exports = router;