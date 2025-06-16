import express from 'express';
import { createReview, getReviews } from '../controllers/reviewController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
router.get('/:movieId', getReviews);
router.post('/:movieId', protect, createReview);
export default router;
