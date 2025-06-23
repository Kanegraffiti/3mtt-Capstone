import { Link } from 'react-router-dom';

const MovieCard = ({ movie, onRemove, children }) => {
  const { id, title, poster_path } = movie;
  return (
    <div
      className="relative flex-shrink-0 w-36 sm:w-44"
      style={{ minWidth: '140px' }}
    >
      {onRemove && (
        <button
          onClick={() => onRemove(id)}
          className="absolute right-1 top-1 bg-black/50 rounded-full p-1 hover:bg-red-600"
        >
          &times;
        </button>
      )}
      <Link to={`/movie/${id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w300${poster_path}`}
          alt={title}
          className="w-full h-48 object-cover rounded"
        />
      </Link>
      <p className="mt-1 text-xs font-semibold text-center truncate">{title}</p>
      {children}
    </div>
  );
};

export default MovieCard;
