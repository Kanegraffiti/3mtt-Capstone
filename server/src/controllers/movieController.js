import fetch from 'node-fetch';

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
