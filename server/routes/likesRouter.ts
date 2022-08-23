import { Router } from 'express';
const { addLike, cancelLike } = require('../controllers');

const router = Router();

router.post('/', addLike);
router.delete('/', cancelLike);

export default router;