import express from 'express';
import { addMovie, deleteMovie, getWatchlist } from '../controllers/watchlistController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
router.get('/', protect, getWatchlist);
router.post('/add', protect, addMovie);
router.delete('/:movieId', protect, deleteMovie);
export default router;
