import { Router } from 'express';
const { createComment, modifyComment, deleteComment, getComments } = require('../controllers');

const router = Router();

router.post('/', createComment);
router.patch('/', modifyComment);
router.delete('/', deleteComment);
router.get('/', getComments);

export default router;