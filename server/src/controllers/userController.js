import User from '../models/User.js';
import Watchlist from '../models/Watchlist.js';
import Review from '../models/Review.js';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password');
    const watchlists = await Watchlist.find({ user: req.user });
    const reviews = await Review.find({ userId: req.user });
    res.json({ user, watchlists, reviews });
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
    if (req.body.avatar) user.avatar = req.body.avatar;
    await user.save();
    const watchlist = await Watchlist.findOne({ user: req.user });
    const reviews = await Review.find({ userId: req.user });
    const cleanUser = { _id: user._id, name: user.name, email: user.email, avatar: user.avatar };
    res.json({ user: cleanUser, watchlist: watchlist ? watchlist.movies : [], reviews });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const followUser = async (req, res) => {
  try {
    if (req.user === req.params.id) {
      return res.status(400).json({ message: 'Cannot follow yourself' });
    }
    const user = await User.findById(req.user);
    const target = await User.findById(req.params.id);
    if (!target) return res.status(404).json({ message: 'User not found' });
    if (!user.following.includes(target._id)) {
      user.following.push(target._id);
      await user.save();
    }
    res.json({ following: user.following });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    user.following = user.following.filter(
      u => u.toString() !== req.params.id
    );
    await user.save();
    res.json({ following: user.following });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getFollowedWatchlists = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    const lists = await Watchlist.find({ user: { $in: user.following } }).populate('user', 'name');
    res.json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
