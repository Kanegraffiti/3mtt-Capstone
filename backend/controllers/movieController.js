const axios = require('axios');
const User = require('../models/User');

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: { api_key: process.env.TMDB_API_KEY },
});

exports.search = async (req, res) => {
  try {
    const { title, genre, year, rating, sort } = req.query;
    const params = {};

    let endpoint = '/search/movie';
    if (title) {
      params.query = title;
    } else {
      endpoint = '/discover/movie';
    }

    if (genre) params.with_genres = genre;
    if (year) params.primary_release_year = year;
    if (rating) params['vote_average.gte'] = rating;
    if (sort) params.sort_by = sort;

    const { data } = await tmdb.get(endpoint, { params });
    res.json(data);
  } catch (err) {
    res.status(500).send('TMDB error');
  }
};

exports.getRecommendations = async (req, res) => {
  try {
    const { data } = await tmdb.get('/movie/popular');
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
