import Watchlist from '../models/Watchlist.js';

// Get all watchlists for the authenticated user
export const getWatchlist = async (req, res) => {
  try {
    const lists = await Watchlist.find({ user: req.user });
    res.json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new watchlist
export const createWatchlist = async (req, res) => {
  const { name, description } = req.body;
  try {
    const list = await Watchlist.create({
      user: req.user,
      name,
      description,
      movies: [],
    });
    res.status(201).json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Rename/update a watchlist
export const updateWatchlist = async (req, res) => {
  const { name, description } = req.body;
  try {
    const list = await Watchlist.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      { name, description },
      { new: true }
    );
    if (!list) return res.status(404).json({ message: 'Watchlist not found' });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a watchlist
export const deleteWatchlist = async (req, res) => {
  try {
    const list = await Watchlist.findOneAndDelete({ _id: req.params.id, user: req.user });
    if (!list) return res.status(404).json({ message: 'Watchlist not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a movie to the user's watchlist
export const addMovie = async (req, res) => {
  const movie = req.body;
  try {
    const list = await Watchlist.findOne({ _id: req.params.id, user: req.user });
    if (!list) return res.status(404).json({ message: 'Watchlist not found' });
    const exists = list.movies.some(m => m.tmdbId === movie.tmdbId);
    if (!exists) {
      list.movies.push({ ...movie, status: movie.status || 'To Watch' });
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
    const list = await Watchlist.findOne({ _id: req.params.id, user: req.user });
    if (!list) return res.status(404).json({ message: 'Watchlist not found' });
    list.movies = list.movies.filter(m => m.tmdbId !== req.params.movieId);
    await list.save();
    res.json(list.movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateMovieStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const list = await Watchlist.findOne({ _id: req.params.id, user: req.user });
    if (!list) return res.status(404).json({ message: 'Watchlist not found' });
    const movie = list.movies.find(m => m.tmdbId === req.params.movieId);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    movie.status = status;
    await list.save();
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Public fetch of a watchlist by id for sharing
export const getSharedWatchlist = async (req, res) => {
  try {
    const list = await Watchlist.findById(req.params.id).populate('user', 'name');
    if (!list) return res.status(404).json({ message: 'Watchlist not found' });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
