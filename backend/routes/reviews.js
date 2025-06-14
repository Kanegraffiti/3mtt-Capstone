const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createReview,
  getReviewsByMovie,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');

router.post('/', auth, createReview);
router.get('/movie/:movieId', getReviewsByMovie);
router.put('/:id', auth, updateReview);
router.delete('/:id', auth, deleteReview);

module.exports = router;
