import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { api } from '../api.js';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext.jsx';
import Modal from './common/Modal.jsx';
import Spinner from './common/Spinner.jsx';

const MovieCard = ({ movie, onAddFavorite, onAddWatchlist }) => {
  const { user } = useContext(AuthContext);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState('');
  const [loadingTrailer, setLoadingTrailer] = useState(false);
  const [trailerError, setTrailerError] = useState('');

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

  const fetchTrailer = async () => {
    setLoadingTrailer(true);
    setTrailerError('');
    try {
      const res = await api.get(`movies/${movie.id}/videos`);
      let vid = (res.data.results || []).find(
        (v) => v.site === 'YouTube' && v.type === 'Trailer' && v.official
      );
      if (!vid) {
        const query = encodeURIComponent(`${movie.title} official trailer`);
        const ytKey = import.meta.env.VITE_YT_API_KEY;
        if (ytKey) {
          const ytRes = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResults=1&type=video&key=${ytKey}`
          );
          const ytData = await ytRes.json();
          if (ytData.items && ytData.items.length > 0) {
            vid = { key: ytData.items[0].id.videoId };
          }
        }
      }
      if (vid) setTrailerKey(vid.key);
      else setTrailerError('Trailer not available');
    } catch (err) {
      console.error(err);
      setTrailerError('Trailer not available');
    } finally {
      setLoadingTrailer(false);
    }
  };

  const openTrailer = async () => {
    if (!trailerKey && !loadingTrailer) {
      await fetchTrailer();
    }
    if (trailerKey) setShowTrailer(true);
  };


  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-md overflow-hidden shadow-md group bg-surface"
      >
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="w-full aspect-[2/3] object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-black/60 opacity-0 group-hover:opacity-100 transition p-2">
          <h3 className="text-sm font-semibold text-center mb-2 truncate">
            {movie.title}
          </h3>
          <div className="flex justify-between gap-2">
            <button
              onClick={addWatchlist}
              className="bg-brand-from px-2 py-1 text-xs rounded text-white flex-1"
            >
              + Watchlist
            </button>
            <button
              onClick={openTrailer}
              title={trailerError}
              className="bg-brand-to px-2 py-1 text-xs rounded text-white flex-1"
            >
              {loadingTrailer ? 'Loading...' : 'Watch Trailer'}
            </button>
          </div>
        </div>
      </motion.div>
      <Modal open={showTrailer} onClose={() => setShowTrailer(false)}>
        {loadingTrailer ? (
          <Spinner />
        ) : trailerKey ? (
          <iframe
            title="Trailer"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            allowFullScreen
            className="w-full aspect-video"

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
            className="w-full aspect-[2/3] object-cover transition-transform group-hover:scale-10
          />
        ) : (
          <p className="text-center p-4">{trailerError}</p>
        )}
      </Modal>
    </>
  );
};
export default MovieCard;
