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

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;
    await user.save();
    const watchlist = await Watchlist.findOne({ user: req.user });
    const reviews = await Review.find({ userId: req.user });
    const cleanUser = { _id: user._id, name: user.name, email: user.email };
    res.json({ user: cleanUser, watchlist: watchlist ? watchlist.movies : [], reviews });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
