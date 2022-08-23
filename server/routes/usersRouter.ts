import { Router } from 'express';
const { signup, login, logout, emailAuthentication, modifyUserInfo, withdrawal } = require('../controllers');

const router = Router();

router.post('/', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/emailcheck', emailAuthentication);

router.patch('/', modifyUserInfo);
router.delete('/', withdrawal);

export default router;