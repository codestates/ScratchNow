import { Router } from 'express';
const {
  createPost,
  modifyPost,
  deletePost,
  getPost,
} = require('../controllers');

const router = Router();

router.post('/', createPost);
router.patch('/', modifyPost);
router.delete('/', deletePost);
router.get('/', getPost);

export default router;
