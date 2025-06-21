import { useEffect, useState, useContext, useRef } from 'react';
import { api } from '../api.js';
import MovieCard from '../components/MovieCard.jsx';
import Slider from '../components/common/Slider.jsx';
import HeroVideo from '../components/HeroVideo.jsx';
import useInfiniteScroll from '../hooks/useInfiniteScroll.js';
import { AuthContext } from '../context/AuthContext.jsx';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [advanced, setAdvanced] = useState([]);
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  const [hasMore, setHasMore] = useState(true);
  const { user } = useContext(AuthContext);

  const loadMore = () => setPage(p => p + 1);
  useInfiniteScroll({ loader, hasMore, loadMore });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await api.get(`movies/trending?page=${page}`);
        const newMovies = res.data.results || [];
        setMovies(prev => [...prev, ...newMovies]);
        if (newMovies.length > 0) {
          localStorage.setItem('cache_trending', JSON.stringify(newMovies.slice(0, 20)));
        }
        if (page >= 25 || newMovies.length === 0) setHasMore(false);
      } catch (err) {
        const cached = localStorage.getItem('cache_trending');
        if (cached && movies.length === 0) {
          setMovies(JSON.parse(cached));
        }
        setHasMore(false);
      }
    };
    if (hasMore) fetchMovies();
  }, [page]);


  useEffect(() => {
    if (!user) {
      setRecommended([]);
      setAdvanced([]);
      return;
    }
    const token = localStorage.getItem('token');
    api
      .get('movies/recommendations', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setRecommended(res.data.results))
      .catch(() => setRecommended([]));
    api
      .get('movies/recommendations/advanced', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setAdvanced(res.data.results))
      .catch(() => setAdvanced([]));
  }, [user]);

  const search = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (genre) params.append('genre', genre);
    if (year) params.append('year', year);
    if (sortBy) params.append('sortBy', sortBy);
    const res = await api.get(`movies/search?${params.toString()}`);
    setMovies(res.data.results);
  };

  return (
    <div className="p-4">
      <HeroVideo />
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
        <button className="px-4 py-2 bg-brand hover:bg-brand/90 text-white rounded" type="submit">Search</button>
      </form>
      {user && recommended.length > 0 && (
        <Slider title="Recommended for You">
          {recommended.map(m => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </Slider>
      )}
      {user && advanced.length > 0 && (
        <Slider title="Top Picks">
          {advanced.map(m => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </Slider>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map(m => <MovieCard key={m.id} movie={m} />)}
      </div>
      {hasMore && <div ref={loader} />}
    </div>
  );
};

export default Home;
