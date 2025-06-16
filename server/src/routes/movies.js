import express from 'express';
import { searchMovies, trendingMovies } from '../controllers/movieController.js';

const router = express.Router();
router.get('/search', searchMovies);
router.get('/trending', trendingMovies);
export default router;
