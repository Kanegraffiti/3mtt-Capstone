import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Watchlist = () => {
  const [movies, setMovies] = useState([]);
  const { token } = useContext(AuthContext);

  const fetchWatchlist = async () => {
    try {
      const { data: ids } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/movies/watchlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const moviePromises = ids.map((id) =>
        axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
        )
      );
      const responses = await Promise.all(moviePromises);
      setMovies(responses.map((res) => res.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const removeMovie = async (movieId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/movies/watchlist/${movieId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMovies(movies.filter((m) => m.id !== movieId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Your Watchlist</h2>
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
            <button onClick={() => removeMovie(movie.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
