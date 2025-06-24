import { Link } from 'react-router-dom';
import { useState } from 'react';
import Modal from './Modal.jsx';
import Spinner from './Spinner.jsx';
import { api } from '../../api.js';

const MovieCard = ({ movie, onRemove, children }) => {
  const { id, title, poster_path } = movie;
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState('');
  const [loadingTrailer, setLoadingTrailer] = useState(false);
  const [trailerError, setTrailerError] = useState('');

  const openTrailer = async () => {
    setTrailerError('');
    setLoadingTrailer(true);
    try {
      const res = await api.get(`movies/${id}/videos`);
      const vid = (res.data.results || []).find(
        (v) => v.site === 'YouTube' && v.type === 'Trailer' && v.official
      );
      if (vid) {
        setTrailerKey(vid.key);
        setShowTrailer(true);
      } else {
        setTrailerError('Trailer not available');
      }
    } catch (err) {
      console.error(err);
      setTrailerError('Trailer not available');
    } finally {
      setLoadingTrailer(false);
    }
  };

  return (
    <>
    <div className="relative flex-shrink-0 w-36 sm:w-44 group">
      {onRemove && (
        <button
          onClick={() => onRemove(id)}
          className="absolute right-1 top-1 bg-black/50 rounded-full p-1 hover:bg-red-700"
          aria-label="Remove"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-3 h-3 text-red-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      <Link to={`/movie/${id}`}> 
        <img
          src={`https://image.tmdb.org/t/p/w300${poster_path}`}
          alt={title}
          className="w-full aspect-[2/3] object-cover rounded"
        />
      </Link>
      <div className="absolute inset-0 bg-black/60 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition p-2 rounded">
        <h4 className="text-xs font-semibold text-center mb-1 truncate">{title}</h4>
        <button onClick={openTrailer} title={trailerError} className="bg-brand-to text-white text-xs rounded px-2 py-1">{loadingTrailer ? 'Loading...' : 'Watch Trailer'}</button>
      </div>
      {children}
    </div>
    <Modal open={showTrailer} onClose={() => setShowTrailer(false)}>
      {loadingTrailer ? (
        <Spinner />
      ) : trailerKey ? (
        <iframe
          title="Trailer"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          allowFullScreen
          className="w-full aspect-video"
        />
      ) : (
        <p className="text-center p-4">{trailerError}</p>
      )}
    </Modal>
    </>
  );
};

export default MovieCard;
