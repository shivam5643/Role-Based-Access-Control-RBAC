import express from 'express';
import { 
  getPosts, 
  getPost, 
  createPost, 
  updatePost, 
  deletePost 
} from '../controllers/postController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getPosts);
router.get('/:id', getPost);

// Protected routes
router.post('/', protect, createPost); // Both users and admins can create posts
router.put('/:id', protect, updatePost); // Author or admin can update
router.delete('/:id', protect, deletePost); // Author or admin can delete

export default router;