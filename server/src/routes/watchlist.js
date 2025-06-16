import express from 'express';
import { addMovie, deleteMovie } from '../controllers/watchlistController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
router.post('/add', protect, addMovie);
router.delete('/:id', protect, deleteMovie);
export default router;
