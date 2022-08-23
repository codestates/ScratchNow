import { Router } from 'express';
const { createPost, modifyPost, deletePost, getPost, getTotalFeed, getUserFeed } = require('../controllers');

const router = Router();

router.post('/', createPost);
router.patch('/', modifyPost);
router.delete('/', deletePost);
router.get('/', getPost);

router.get('/totalfeed', getTotalFeed);
router.get('/userfeed', getUserFeed);

export default router;