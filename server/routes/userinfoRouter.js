const express = require('express');
const router = express.Router();
const userinfoController = require('./../controllers/userinfoController');

router.get('/:userId', userinfoController.getUserinfoById);
router.post('/:userId', userinfoController.changeUserinfo);
router.patch('/:userId', userinfoController.changeProfileImg);
router.delete('/:userId', userinfoController.deleteUserinfo);

module.exports = router;
