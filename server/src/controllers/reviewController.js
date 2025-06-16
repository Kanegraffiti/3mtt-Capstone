import Review from '../models/Review.js';

export const createReview = async (req, res) => {
  try {
    const review = await Review.create({
      user: req.user,
      movieId: req.params.movieId,
      rating: req.body.rating,
      text: req.body.text,
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
