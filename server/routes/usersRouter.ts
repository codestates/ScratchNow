import { Router } from 'express';
import SignController from '../controllers/signController';
import UserinfoController from '../controllers/userinfoController';

const router = Router();

router.post('/', SignController.signup);
router.post('/login', SignController.login);
router.post('/logout', SignController.logout);
router.post('/emailcheck', SignController.emailAuthentication);
router.get('/kakao/login', SignController.kakaoOAuth);
router.get('/kakao/token', SignController.kakaoToken);
router.get('/google/login', SignController.googleOAuth);
router.get('/google/callback', SignController.googleCallback);

router.get('/', UserinfoController.getUserInfo);
router.patch('/profileimagenull', UserinfoController.deleteProfileImage);
router.post('/nicknamecheck', UserinfoController.checkNickname);
router.patch('/', UserinfoController.updateUserInfo);
router.patch('/password', UserinfoController.updatePassword);
router.delete('/', UserinfoController.withdrawal);

export default router;
