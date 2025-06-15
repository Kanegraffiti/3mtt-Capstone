const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  search,
  getFavorites,
  addFavorite,
  getWatchlist,
  addWatchlist,
  removeFavorite,
  removeWatchlist,
  getRecommendations,
} = require('../controllers/movieController');

router.get('/search', search);
router.get('/recommendations', auth, getRecommendations);
router.get('/favorites', auth, getFavorites);
router.post('/favorites', auth, addFavorite);
router.delete('/favorites/:movieId', auth, removeFavorite);
router.get('/watchlist', auth, getWatchlist);
router.post('/watchlist', auth, addWatchlist);
router.delete('/watchlist/:movieId', auth, removeWatchlist);

module.exports = router;
