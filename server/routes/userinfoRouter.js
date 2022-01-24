const express = require('express');
const router = express.Router();
const userinfoController = require('../controllers/UserinfoController');

router.get('/:userId', userinfoController.getUserinfoById);
router.patch('/:userId', userinfoController.changeUserinfo);
// router.patch('/:userId', userinfoController.changeProfileImg);
router.delete('/:userId', userinfoController.deleteUserinfo);

module.exports = router;
