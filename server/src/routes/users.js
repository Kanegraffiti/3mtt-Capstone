import express from 'express';
import {
  getProfile,
  updateProfile,
  followUser,
  unfollowUser,
  getFollowedWatchlists,
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.post('/:id/follow', protect, followUser);
router.delete('/:id/follow', protect, unfollowUser);
router.get('/following/watchlists', protect, getFollowedWatchlists);
export default router;
