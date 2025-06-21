import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { api } from '../api.js';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext.jsx';

const MovieCard = ({ movie }) => {
  const { user } = useContext(AuthContext);

  const add = async (e) => {
    e.preventDefault();
    if (!user || !user.watchlists || user.watchlists.length === 0) return;
    const token = localStorage.getItem('token');
    const listId = user.watchlists[0]._id;
    await api.post(`watchlist/${listId}/add`, { tmdbId: movie.id, title: movie.title, posterPath: movie.poster_path }, { headers: { Authorization: `Bearer ${token}` } });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Link to={`/movie/${movie.id}`} className="bg-surface p-2 rounded relative block transition duration-300 hover:scale-105 hover:shadow-lg">
        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} className="mx-auto" />
        <h3 className="mt-2 text-center text-sm">{movie.title}</h3>
        {user && (
          <button
            onClick={add}
            className="absolute top-1 right-1 bg-brand hover:bg-brand/90 text-white text-xs px-1"
          >
            Add
          </button>
        )}
      </Link>
    </motion.div>
  );
};
export default MovieCard;
