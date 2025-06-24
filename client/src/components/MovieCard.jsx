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
      className="bg-surface rounded overflow-hidden hover:shadow-lg transition hover:scale-105"
    >
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-[250px] object-cover"
        />
      </Link>
      <div className="p-2">
        <h3 className="text-center text-sm font-semibold truncate">{movie.title}</h3>
        <div className="flex justify-center gap-2 mt-2">
          <button onClick={addFavorite} className="bg-brand hover:bg-brand/90 text-white px-2 py-1 text-xs rounded">
            ❤️ Favorite
          </button>
          <button onClick={addWatchlist} className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 text-xs rounded">
            🎬 Watchlist
          </button>
        </div>
      </div>
    </motion.div>
  );
};
export default MovieCard;
