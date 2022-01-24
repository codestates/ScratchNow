const express = require('express');
const router = express.Router();
const commentController = require('../controllers/CommentController');

router.post('/', commentController.createComment);
router.patch('/:commentId',commentController.patchComment);
router.delete('/:commentId', commentController.deleteComment);

module.exports = router;