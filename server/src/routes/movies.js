import express from 'express';
import { searchMovies, trendingMovies, movieDetails, movieVideos, movieProviders, recommendedMovies, advancedRecommendations } from '../controllers/movieController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
router.get('/search', searchMovies);
router.get('/trending', trendingMovies);
router.get('/recommendations', protect, recommendedMovies);
router.get('/recommendations/advanced', protect, advancedRecommendations);
router.get('/:id/videos', movieVideos);
router.get('/:id/providers', movieProviders);
router.get('/:id', movieDetails);
export default router;
