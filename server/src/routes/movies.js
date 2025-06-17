import express from 'express';
import { searchMovies, trendingMovies, movieDetails, movieVideos, recommendedMovies } from '../controllers/movieController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
router.get('/search', searchMovies);
router.get('/trending', trendingMovies);
router.get('/recommendations', protect, recommendedMovies);
router.get('/:id/videos', movieVideos);
router.get('/:id', movieDetails);
export default router;
