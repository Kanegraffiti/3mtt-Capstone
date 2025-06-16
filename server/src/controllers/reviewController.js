import Review from '../models/Review.js';

// Create a new review for a movie
export const createReview = async (req, res) => {
  try {
    const review = await Review.create({
      userId: req.user,
      movieId: req.params.movieId,
      rating: req.body.rating,
      comment: req.body.comment,
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all reviews for a specific movie
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.movieId }).populate('userId', 'name');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
