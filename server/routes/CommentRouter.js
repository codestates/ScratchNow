const express = require('express');
const router = express.Router();
const commentController = require('../controllers/CommentController');

router.post('/', commentController.createComment);
router.patch('/',commentController.updateComment);
router.delete('/', commentController.deleteComment);

module.exports = router;
