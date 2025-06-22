import express from 'express';
import axios from 'axios';
import { trendingMovies, movieDetails, movieVideos, movieProviders, recommendedMovies, advancedRecommendations } from '../controllers/movieController.js';
import Movie from '../models/Movie.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
router.get('/search', async (req, res) => {
  try {
    const { query, genres, year, minRating } = req.query;
    const filter = {};

    if (query) filter.title = { $regex: query, $options: 'i' };

    if (genres) {
      const genreArray = Array.isArray(genres) ? genres : genres.split(',');
      filter.genres = { $in: genreArray };
    }

    if (year) {
      filter.releaseDate = { $regex: `^${year}` };
    }

    if (minRating) {
      filter.averageRating = { $gte: parseFloat(minRating) };
    }

    let results = await Movie.find(filter).limit(20);

    if (results.length === 0 && query) {
      // fallback to TMDB if no results
      const tmdbRes = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: process.env.TMDB_API_KEY,
          query
        }
      });

      results = tmdbRes.data.results.map(movie => ({
        title: movie.title,
        releaseDate: movie.release_date,
        posterPath: movie.poster_path,
        overview: movie.overview
      }));
    }

    if (!results.length) {
      return res.status(404).json({ message: 'No matching movies found.' });
    }

    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Search failed. Please try again.' });
  }
});
router.get('/trending', trendingMovies);
router.get('/recommendations', protect, recommendedMovies);
router.get('/recommendations/advanced', protect, advancedRecommendations);
router.get('/:id/videos', movieVideos);
router.get('/:id/providers', movieProviders);
router.get('/:id', movieDetails);
export default router;
