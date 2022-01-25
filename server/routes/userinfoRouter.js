const express = require('express');
const router = express.Router();
const userinfoController = require('../controllers/UserinfoController');

router.get('/:userId', userinfoController.getUserinfoById);
router.patch('/', userinfoController.changeUserinfo);
router.patch('/imgchange', userinfoController.changeProfileImg);
router.delete('/', userinfoController.deleteUserinfo);

module.exports = router;
