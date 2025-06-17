import express from 'express';
import {
  addMovie,
  deleteMovie,
  getWatchlist,
  createWatchlist,
  updateWatchlist,
  deleteWatchlist,
} from '../controllers/watchlistController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
router.get('/', protect, getWatchlist);
router.post('/', protect, createWatchlist);
router.put('/:id', protect, updateWatchlist);
router.delete('/:id', protect, deleteWatchlist);
router.post('/:id/add', protect, addMovie);
router.delete('/:id/movies/:movieId', protect, deleteMovie);
export default router;
