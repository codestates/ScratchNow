const express = require('express');
const router = express.Router();
const postController = require('../controllers/PostController');

router.get('/:postId', postController.getPostById);
router.post('/', postController.createPost);
router.patch('/', postController.updatePostById);
router.delete('/', postController.deletePost);

module.exports = router;