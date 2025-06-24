import { Link } from 'react-router-dom';

const MovieCard = ({ movie, onRemove, children }) => {
  const { id, title, poster_path } = movie;
  return (
    <div className="relative flex-shrink-0 w-36 sm:w-44">
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
      <Link to={`/movie/${id}`} className="group block">
        <img
          src={`https://image.tmdb.org/t/p/w300${poster_path}`}
          alt={title}
          className="w-full aspect-[2/3] object-cover rounded transition-transform group-hover:scale-105"
        />
      </Link>
      <p className="mt-1 text-xs font-semibold text-center truncate">{title}</p>
      {children}
    </div>
  );
};

export default MovieCard;
