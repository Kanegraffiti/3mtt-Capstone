import fetch from 'node-fetch';

const TMDB_BASE = 'https://api.themoviedb.org/3';

export const searchMovies = async (req, res) => {
  try {
    const query = new URLSearchParams({
      api_key: process.env.TMDB_API_KEY,
      query: req.query.q,
    });
    const response = await fetch(`${TMDB_BASE}/search/movie?${query}`);
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
