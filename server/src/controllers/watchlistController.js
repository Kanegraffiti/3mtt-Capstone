import Watchlist from '../models/Watchlist.js';

// Get movies in the authenticated user's watchlist
export const getWatchlist = async (req, res) => {
  try {
    const list = await Watchlist.findOne({ user: req.user });
    res.json(list ? list.movies : []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a movie to the user's watchlist
export const addMovie = async (req, res) => {
  const movie = req.body;
  try {
    let list = await Watchlist.findOne({ user: req.user });
    if (!list) {
      list = await Watchlist.create({ user: req.user, name: 'My Watchlist', movies: [] });
    }
    const exists = list.movies.some(m => m.tmdbId === movie.tmdbId);
    if (!exists) {
      list.movies.push(movie);
      await list.save();
    }
    res.status(201).json(list.movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove a movie from the watchlist
export const deleteMovie = async (req, res) => {
  try {
    const list = await Watchlist.findOne({ user: req.user });
    if (!list) return res.status(404).json({ message: 'Watchlist not found' });
    list.movies = list.movies.filter(m => m.tmdbId !== req.params.movieId);
    await list.save();
    res.json(list.movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
