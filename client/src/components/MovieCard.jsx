import { Link } from 'react-router-dom';
import { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext.jsx';
const MovieCard = ({ movie }) => {
  const { user } = useContext(AuthContext);

  const add = async (e) => {
    e.preventDefault();
    if (!user || !user.watchlists || user.watchlists.length === 0) return;
    const token = localStorage.getItem('token');
    const listId = user.watchlists[0]._id;
    await axios.post(`/watchlist/${listId}/add`, { tmdbId: movie.id, title: movie.title, posterPath: movie.poster_path }, { headers: { Authorization: `Bearer ${token}` } });
  };

  return (
    <Link to={`/movie/${movie.id}`} className="bg-gray-700 p-2 rounded block relative">
      <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
      <h3 className="mt-2 text-center">{movie.title}</h3>
      {user && (
        <button onClick={add} className="absolute top-2 right-2 bg-blue-500 text-xs px-2">Add</button>
      )}
    </Link>
  );
};
export default MovieCard;
