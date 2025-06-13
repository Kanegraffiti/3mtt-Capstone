const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  search,
  getFavorites,
  addFavorite,
  getWatchlist,
  addWatchlist,
} = require('../controllers/movieController');

router.get('/search', search);
router.get('/favorites', auth, getFavorites);
router.post('/favorites', auth, addFavorite);
router.get('/watchlist', auth, getWatchlist);
router.post('/watchlist', auth, addWatchlist);

module.exports = router;
