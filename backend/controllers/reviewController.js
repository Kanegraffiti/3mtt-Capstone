const Review = require('../models/Review');

exports.createReview = async (req, res) => {
  try {
    const review = await Review.create({
      movieId: req.body.movieId,
      userId: req.user.id,
      text: req.body.text,
      rating: req.body.rating,
    });
    res.json(review);
  } catch (err) {
    res.status(400).json({ msg: 'Unable to create review' });
  }
};

exports.getReviewsByMovie = async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.movieId });
    res.json(reviews);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.updateReview = async (req, res) => {
  try {
    let review = await Review.findById(req.params.id);
    if (!review) return res.status(404).send('Review not found');
    if (review.userId.toString() !== req.user.id) return res.status(401).send('Unauthorized');

    review.text = req.body.text ?? review.text;
    review.rating = req.body.rating ?? review.rating;
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).send('Review not found');
    if (review.userId.toString() !== req.user.id) return res.status(401).send('Unauthorized');
    await review.remove();
    res.json({ msg: 'Review removed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};
