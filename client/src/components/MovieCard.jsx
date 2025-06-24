import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { api } from '../api.js';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext.jsx';

const MovieCard = ({ movie, onAddFavorite, onAddWatchlist }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const addWatchlist = async () => {
    if (onAddWatchlist) return onAddWatchlist(movie);
    if (!user || !user.watchlists || user.watchlists.length === 0) return;
    const token = localStorage.getItem('token');
    const listId = user.watchlists[0]._id;
    await api.post(
      `watchlist/${listId}/add`,
      { tmdbId: movie.id, title: movie.title, posterPath: movie.poster_path },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  const addFavorite = async () => {
    if (onAddFavorite) return onAddFavorite(movie);
    if (!user) return;
    const token = localStorage.getItem('token');
    await api.post(
      'favorites/add',
      { tmdbId: movie.id, title: movie.title, posterPath: movie.poster_path },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-surface rounded overflow-hidden hover:shadow-lg w-36 sm:w-44 flex-shrink-0"
    >
      <div className="relative group">
        <Link to={`/movie/${movie.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className="w-full aspect-[2/3] object-cover transition-transform group-hover:scale-105"
          />
        </Link>
        <button
          onClick={addWatchlist}
          className="absolute bottom-1 right-1 bg-brand-from text-white rounded-full p-1 text-xs"
        >
          +
        </button>
      </div>
      <div className="p-2">
        <h3 className="text-center text-sm font-semibold truncate">{movie.title}</h3>
      </div>
    </motion.div>
  );
};
export default MovieCard;
