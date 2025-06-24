import express from 'express';
import {
  addMovie,
  deleteMovie,
  getWatchlist,
  createWatchlist,
  updateWatchlist,
  deleteWatchlist,
  getSharedWatchlist,
  updateMovieStatus,
} from '../controllers/watchlistController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
router.get('/', protect, getWatchlist);
router.post('/', protect, createWatchlist);
router.put('/:id', protect, updateWatchlist);
router.delete('/:id', protect, deleteWatchlist);
router.post('/:id/add', protect, addMovie);
router.delete('/:id/movies/:movieId', protect, deleteMovie);
router.put('/:id/movies/:movieId/status', protect, updateMovieStatus);
router.get('/shared/:id', getSharedWatchlist);
export default router;
