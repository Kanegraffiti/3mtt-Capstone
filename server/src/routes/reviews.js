import express from 'express';
import { createReview } from '../controllers/reviewController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
router.post('/:movieId', protect, createReview);
export default router;
