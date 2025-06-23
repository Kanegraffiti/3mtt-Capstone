import fetch from 'node-fetch';
import Watchlist from '../models/Watchlist.js';
import Review from '../models/Review.js';

import Recommendation from "../models/Recommendation.js";
const TMDB_BASE = 'https://api.themoviedb.org/3';

export const searchMovies = async (req, res) => {
  try {
    const { q, year, genre, sortBy, page = 1 } = req.query;
    const params = new URLSearchParams({ api_key: process.env.TMDB_API_KEY });
    if (q) params.append('query', q);
    if (year) params.append('year', year);
    if (genre) params.append('with_genres', genre);
    if (sortBy) params.append('sort_by', sortBy);
    params.append('page', page);

    let endpoint = `${TMDB_BASE}/search/movie?${params}`;
    // If no text query is provided, fall back to discover endpoint so
    // searching by only genre or year still returns results
    if (!q) {
      endpoint = `${TMDB_BASE}/discover/movie?${params}`;
    }

    const response = await fetch(endpoint);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const trendingMovies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const query1 = new URLSearchParams({ api_key: process.env.TMDB_API_KEY, page });
    const resp1 = await fetch(`${TMDB_BASE}/trending/movie/week?${query1}`);
    const data1 = await resp1.json();
    const query2 = new URLSearchParams({ api_key: process.env.TMDB_API_KEY, page: page + 1 });
    const resp2 = await fetch(`${TMDB_BASE}/trending/movie/week?${query2}`);
    const data2 = await resp2.json();
    const results = [...(data1.results || []), ...(data2.results || [])].slice(0, 30);
    res.json({ results });
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

export const movieProviders = async (req, res) => {
  try {
    const query = new URLSearchParams({ api_key: process.env.TMDB_API_KEY });
    const response = await fetch(`${TMDB_BASE}/movie/${req.params.id}/watch/providers?${query}`);
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


export const advancedRecommendations = async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.user });
    if (reviews.length === 0) {
      await Recommendation.deleteMany({ user: req.user });
      return res.json({ results: [] });
    }
    const query = new URLSearchParams({ api_key: process.env.TMDB_API_KEY });
    // fetch movie genres for each reviewed movie
    const reviewDetails = await Promise.all(
      reviews.map(r =>
        fetch(`${TMDB_BASE}/movie/${r.movieId}?${query}`).then(resp => resp.json())
      )
    );
    const genreMap = {};
    reviewDetails.forEach((data, idx) => {
      const genres = data.genres || [];
      genres.forEach(g => {
        if (!genreMap[g.id]) genreMap[g.id] = [];
        genreMap[g.id].push(reviews[idx].rating);
      });
    });
    const genreScores = {};
    Object.keys(genreMap).forEach(id => {
      const vals = genreMap[id];
      genreScores[id] = vals.reduce((a, b) => a + b, 0) / vals.length;
    });
    const trendingRes = await fetch(`${TMDB_BASE}/trending/movie/week?${query}`);
    const trending = await trendingRes.json();
    const scored = (trending.results || []).map(m => {
      const scores = (m.genre_ids || []).map(g => genreScores[g] || 0);
      const score = scores.length ? scores.reduce((a,b) => a+b,0) / scores.length : 0;
      return { ...m, score };
    }).sort((a,b) => b.score - a.score);

    await Recommendation.deleteMany({ user: req.user });
    const docs = scored.slice(0, 10).map(m => ({
      user: req.user,
      movieId: m.id,
      title: m.title,
      posterPath: m.poster_path,
      score: m.score,
    }));
    if (docs.length > 0) await Recommendation.insertMany(docs);
    res.json({ results: scored.slice(0, 10) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
