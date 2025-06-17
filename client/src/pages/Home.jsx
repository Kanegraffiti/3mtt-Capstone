import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard.jsx';
import Slider from '../components/Slider.jsx';
import { AuthContext } from '../context/AuthContext.jsx';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [sortBy, setSortBy] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get('/movies/trending').then(res => setMovies(res.data.results));
  }, []);

  useEffect(() => {
    if (!user) {
      setRecommended([]);
      return;
    }
    const token = localStorage.getItem('token');
    axios
      .get('/movies/recommendations', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setRecommended(res.data.results))
      .catch(() => setRecommended([]));
  }, [user]);

  const search = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (genre) params.append('genre', genre);
    if (year) params.append('year', year);
    if (sortBy) params.append('sortBy', sortBy);
    const res = await axios.get(`/movies/search?${params.toString()}`);
    setMovies(res.data.results);
  };

  return (
    <div className="p-4">
      <form onSubmit={search} className="mb-4 flex flex-wrap gap-2 items-center">
        <input
          className="flex-grow p-2 text-black"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search movies..."
        />
        <select className="p-2 text-black" value={genre} onChange={e => setGenre(e.target.value)}>
          <option value="">Genre</option>
          <option value="28">Action</option>
          <option value="35">Comedy</option>
          <option value="18">Drama</option>
        </select>
        <input className="p-2 w-20 text-black" value={year} onChange={e => setYear(e.target.value)} placeholder="Year" />
        <select className="p-2 text-black" value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="">Sort</option>
          <option value="popularity.desc">Popular</option>
          <option value="release_date.desc">Newest</option>
        </select>
        <button className="px-4 py-2 bg-blue-500 rounded" type="submit">Search</button>
      </form>
      {user && recommended.length > 0 && (
        <Slider title="Recommended for You">
          {recommended.map(m => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </Slider>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map(m => <MovieCard key={m.id} movie={m} />)}
      </div>
    </div>
  );
};

export default Home;
