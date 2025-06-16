const MovieCard = ({ movie }) => (
  <div className="bg-gray-700 p-2 rounded">
    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
    <h3 className="mt-2 text-center">{movie.title}</h3>
  </div>
);
export default MovieCard;
