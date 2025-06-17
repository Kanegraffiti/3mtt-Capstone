import fetch from 'node-fetch';
import Watchlist from '../models/Watchlist.js';
import Review from '../models/Review.js';

const TMDB_BASE = 'https://api.themoviedb.org/3';

export const searchMovies = async (req, res) => {
  try {
    const params = new URLSearchParams({
      api_key: process.env.TMDB_API_KEY,
      query: req.query.q,
    });
    if (req.query.year) params.append('year', req.query.year);
    if (req.query.genre) params.append('with_genres', req.query.genre);
    if (req.query.sortBy) params.append('sort_by', req.query.sortBy);
    const response = await fetch(`${TMDB_BASE}/search/movie?${params}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const trendingMovies = async (req, res) => {
  try {
    const query = new URLSearchParams({ api_key: process.env.TMDB_API_KEY });
    const response = await fetch(`${TMDB_BASE}/trending/movie/week?${query}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const movieDetails = async (req, res) => {
  try {
    const query = new URLSearchParams({ api_key: process.env.TMDB_API_KEY });
    const response = await fetch(`${TMDB_BASE}/movie/${req.params.id}?${query}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const movieVideos = async (req, res) => {
  try {
    const query = new URLSearchParams({ api_key: process.env.TMDB_API_KEY });
    const response = await fetch(`${TMDB_BASE}/movie/${req.params.id}/videos?${query}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const recommendedMovies = async (req, res) => {
  try {
    // Fetch movies from user's watchlists and rated movies
    const lists = await Watchlist.find({ user: req.user });
    const watchlistIds = lists.flatMap(l => l.movies.map(m => m.tmdbId));
    const reviews = await Review.find({ userId: req.user });
    const ratedIds = reviews.map(r => r.movieId);
    const uniqueIds = [...new Set([...watchlistIds, ...ratedIds])].slice(0, 5);

    if (uniqueIds.length === 0) {
      return res.json({ results: [] });
    }

    const query = new URLSearchParams({ api_key: process.env.TMDB_API_KEY });
    const responses = await Promise.all(
      uniqueIds.map(id =>
        fetch(`${TMDB_BASE}/movie/${id}/recommendations?${query}`).then(r => r.json())
      )
    );

    const all = responses.flatMap(r => r.results || []);
    const seen = new Set();
    const deduped = [];
    for (const m of all) {
      if (!seen.has(m.id)) {
        seen.add(m.id);
        deduped.push(m);
      }
    }

    res.json({ results: deduped });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
