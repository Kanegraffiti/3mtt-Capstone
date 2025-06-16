import express from 'express';
import { getProfile } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
router.get('/profile', protect, getProfile);
export default router;
