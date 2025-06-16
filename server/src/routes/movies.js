import express from 'express';
import { searchMovies, trendingMovies, movieDetails, movieVideos } from '../controllers/movieController.js';

const router = express.Router();
router.get('/search', searchMovies);
router.get('/trending', trendingMovies);
router.get('/:id/videos', movieVideos);
router.get('/:id', movieDetails);
export default router;
