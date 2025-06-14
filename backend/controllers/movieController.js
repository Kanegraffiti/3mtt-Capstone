const axios = require('axios');
const User = require('../models/User');

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: { api_key: process.env.TMDB_API_KEY },
});

exports.search = async (req, res) => {
  try {
    const { data } = await tmdb.get('/search/movie', { params: { query: req.query.title } });
    res.json(data);
  } catch (err) {
    res.status(500).send('TMDB error');
  }
};

exports.getFavorites = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user.favorites);
};

exports.addFavorite = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user.favorites.includes(req.body.movieId)) user.favorites.push(req.body.movieId);
  await user.save();
  res.json(user.favorites);
};

exports.getWatchlist = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user.watchlist);
};

exports.addWatchlist = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user.watchlist.includes(req.body.movieId)) user.watchlist.push(req.body.movieId);
  await user.save();
  res.json(user.watchlist);
};

exports.removeFavorite = async (req, res) => {
  const user = await User.findById(req.user.id);
  user.favorites = user.favorites.filter(
    (id) => id.toString() !== req.params.movieId
  );
  await user.save();
  res.json(user.favorites);
};

exports.removeWatchlist = async (req, res) => {
  const user = await User.findById(req.user.id);
  user.watchlist = user.watchlist.filter(
    (id) => id.toString() !== req.params.movieId
  );
  await user.save();
  res.json(user.watchlist);
};
