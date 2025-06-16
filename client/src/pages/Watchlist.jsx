import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard.jsx';
import { AuthContext } from '../context/AuthContext.jsx';

const Watchlist = () => {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem('token');
    axios.get('/watchlist', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setMovies(res.data))
      .catch(() => setMovies([]));
  }, [user]);

  const remove = async (tmdbId) => {
    const token = localStorage.getItem('token');
    const res = await axios.delete(`/watchlist/${tmdbId}`, { headers: { Authorization: `Bearer ${token}` } });
    setMovies(res.data);
  };

  if (!user) return <p className="p-4">Please login</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">My Watchlist</h2>
      {movies.length === 0 && <p>No movies saved.</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map(m => (
          <div key={m.tmdbId} className="relative">
            <MovieCard movie={{ id: m.tmdbId, title: m.title, poster_path: m.posterPath }} />
            <button onClick={() => remove(m.tmdbId)} className="absolute top-2 right-2 bg-red-500 px-2 text-sm">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
