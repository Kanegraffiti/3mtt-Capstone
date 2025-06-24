import Review from '../models/Review.js';
import fetch from 'node-fetch';

const TMDB_BASE = 'https://api.themoviedb.org/3';

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
    const query = new URLSearchParams({ api_key: process.env.TMDB_API_KEY });
    const response = await fetch(`${TMDB_BASE}/movie/${req.params.movieId}/reviews?${query}`);
    const data = await response.json();
    res.json(data.results || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
