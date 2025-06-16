import User from '../models/User.js';
import Watchlist from '../models/Watchlist.js';
import Review from '../models/Review.js';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password');
    const watchlist = await Watchlist.findOne({ user: req.user });
    const reviews = await Review.find({ userId: req.user });
    res.json({ user, watchlist: watchlist ? watchlist.movies : [], reviews });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
