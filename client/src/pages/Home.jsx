import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard.jsx';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    axios.get('/movies/trending').then(res => setMovies(res.data.results));
  }, []);

  const search = async (e) => {
    e.preventDefault();
    const res = await axios.get(`/movies/search?q=${query}`);
    setMovies(res.data.results);
  };

  return (
    <div className="p-4">
      <form onSubmit={search} className="mb-4 flex">
        <input
          className="flex-grow p-2 text-black"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search movies..."
        />
        <button className="ml-2 px-4 py-2 bg-blue-500 rounded" type="submit">Search</button>
      </form>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map(m => <MovieCard key={m.id} movie={m} />)}
      </div>
    </div>
  );
};

export default Home;
