import Watchlist from '../models/Watchlist.js';

export const addMovie = async (req, res) => {
  const { watchlistId, movie } = req.body;
  try {
    const list = await Watchlist.findOne({ _id: watchlistId, user: req.user });
    if (!list) return res.status(404).json({ message: 'Watchlist not found' });
    list.movies.push(movie);
    await list.save();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const list = await Watchlist.findOne({ user: req.user, _id: req.params.id });
    if (!list) return res.status(404).json({ message: 'Watchlist not found' });
    list.movies = list.movies.filter(m => m.tmdbId !== req.body.tmdbId);
    await list.save();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
