const express = require('express');
const router = express.Router();
const LikesController = require('../controllers/LikesController');

router.post('/', LikesController.likeThePost);
router.delete('/', LikesController.deleteLike);

module.exports = router;