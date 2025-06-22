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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Link to={`/movie/${movie.id}`} className="bg-surface p-2 rounded block transition duration-300 hover:scale-105 hover:shadow-lg">
        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} className="mx-auto" />
        <h3 className="mt-2 text-center text-sm">{movie.title}</h3>
      </Link>
      <div className="flex justify-between mt-2">
        <button onClick={addFavorite} className="bg-brand hover:bg-brand/90 text-white px-2 py-1 text-xs rounded">
          ❤️ Favorite
        </button>
        <button onClick={addWatchlist} className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 text-xs rounded">
          🎬 Watchlist
        </button>
      </div>
    </motion.div>
  );
};
export default MovieCard;
