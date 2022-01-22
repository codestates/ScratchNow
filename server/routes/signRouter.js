const express = require('express');
const router = express.Router();
const signController = require('./../controllers/signController');

router.post('/login', signController.login);
router.post('/logout', signController.logout);
router.post('/register', signController.register);
router.post('/register/check', signController.check);

// OAuth 구현할 경우 get 메서드 작성
// router.get('', );
// router.get('', );


module.exports = router;
