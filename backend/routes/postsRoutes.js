import express from 'express';
import auth from '../middlewares/auth.js';
import { addPost, getUserPosts, getPosts, deletePost, updatePost } from '../controllers/postsController.js';

const router = express.Router();

router.get('/', getPosts);

router.get('/user', auth, getUserPosts);

router.post('/', auth, addPost);

router.delete('/:id', auth, deletePost);

router.put("/:id", auth, updatePost);

export { router as postsRoutes }