import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get(
          'https://api.themoviedb.org/3/trending/movie/week',
          { params: { api_key: process.env.REACT_APP_TMDB_KEY } }
        );
        setMovies(res.data.results || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTrending();
  }, []);

  const searchMovies = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/movies/search`,
        {
          params: { title: query, api_key: process.env.REACT_APP_TMDB_KEY },
        }
      );
      setMovies(res.data.results || []);
    } catch (err) {
      console.error(err);
    }
  };

  const addWatchlist = async (movieId) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/movies/watchlist`,
        { movieId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const addFavorite = async (movieId) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/movies/favorites`,
        { movieId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Search Movies</h2>
      <form onSubmit={searchMovies} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter movie title"
        />
        <button type="submit">Search</button>
      </form>

      <h3>Trending Movies</h3>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card" style={{ marginBottom: '1rem' }}>
            <Link to={`/movie/${movie.id}`}>
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
              )}
            </Link>
            <h3>{movie.title}</h3>
            <button onClick={() => addWatchlist(movie.id)}>Add to Watchlist</button>
            <button onClick={() => addFavorite(movie.id)}>Add to Favorite</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
