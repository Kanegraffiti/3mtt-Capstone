import Favorite from '../models/Favorite.js';

export const getFavorites = async (req, res) => {
  try {
    let fav = await Favorite.findOne({ user: req.user });
    if (!fav) fav = await Favorite.create({ user: req.user, movies: [] });
    res.json(fav);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addFavorite = async (req, res) => {
  try {
    let fav = await Favorite.findOne({ user: req.user });
    if (!fav) fav = await Favorite.create({ user: req.user, movies: [] });
    const exists = fav.movies.some(m => m.tmdbId === req.body.tmdbId);
    if (!exists) {
      fav.movies.push(req.body);
      await fav.save();
    }
    res.status(201).json(fav.movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const fav = await Favorite.findOne({ user: req.user });
    if (!fav) return res.status(404).json({ message: 'Not found' });
    fav.movies = fav.movies.filter(m => m.tmdbId !== req.params.id);
    await fav.save();
    res.json(fav.movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
