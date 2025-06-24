import { useEffect, useState, useContext, useRef } from 'react';
import { api } from '../api.js';
import MovieCard from '../components/MovieCard.jsx';
import Slider from '../components/common/Slider.jsx';
import HeroVideo from '../components/HeroVideo.jsx';
import useInfiniteScroll from '../hooks/useInfiniteScroll.js';
import { AuthContext } from '../context/AuthContext.jsx';

const GENRE_IDS = {
  Action: 28,
  Romance: 10749,
  Comedy: 35,
};

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const loader = useRef(null);
  const [hasMore, setHasMore] = useState(true);
  const [trendingError, setTrendingError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [searchFilters, setSearchFilters] = useState({
    genres: [],
    year: '',
    minRating: ''
  });
  const { user } = useContext(AuthContext);

  const loadMore = () => setPage((p) => p + 1);
  useInfiniteScroll({ loader, hasMore, loadMore });

  useEffect(() => {
    api
      .get('movies/trending?page=1')
      .then((res) => setTrending(res.data.results.slice(0, 10)))
      .catch(() => setTrending([]));
  }, []);

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
        setTrendingError('');
      } catch (err) {
        const cached = localStorage.getItem('cache_trending');
        if (cached && movies.length === 0) {
          setMovies(JSON.parse(cached));
        }
        setHasMore(false);
        setTrendingError('Failed to fetch trending movies');
      }
    };
    if (!searching && hasMore) fetchMovies();
  }, [page, searching]);


  // recommendations moved to Library/Watchlist views

  const fetchSearch = async (q, pageNum = 1) => {
    try {
      setSearching(true);
      setSearchError(null);
      const res = await api.get('movies/search', {
        params: {
          q,
          genre: searchFilters.genres
            .map((name) => GENRE_IDS[name])
            .filter(Boolean)
            .join(','),
          year: searchFilters.year,
          page: pageNum,
        },
      });
      setMovies(res.data.results || []);
      setTotalPages(res.data.total_pages || 1);
      setPage(pageNum);
      setHasMore(false);
    } catch (err) {
      setMovies([]);
      setSearchError(err.response?.data?.message || 'Search failed.');
    } finally {
      setSearching(false);
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) await fetchSearch(searchQuery, 1);
  };

  const goToPage = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      fetchSearch(searchQuery, newPage);
    }
  };

  const clearSearch = () => {
    setSearching(false);
    setMovies([]);
    setSearchQuery('');
    setSearchFilters({ genres: [], year: '', minRating: '' });
    setPage(1);
    setHasMore(true);
    setSearchError(null);
  };

  return (
    <div className="p-4">
      <HeroVideo
        value={searchQuery}
        onChange={setSearchQuery}
        onSearch={handleSearch}
      />
      <div className="flex overflow-x-auto gap-2 py-2 mb-4">
        {Object.keys(GENRE_IDS).map((g) => (
          <button
            key={g}
            type="button"
            onClick={() =>
              setSearchFilters((prev) =>
                prev.genres.includes(g)
                  ? { ...prev, genres: prev.genres.filter((n) => n !== g) }
                  : { ...prev, genres: [...prev.genres, g] }
              )
            }
            className={`px-3 py-1 rounded-full whitespace-nowrap border ${searchFilters.genres.includes(g) ? 'bg-brand-from text-white' : 'bg-surface'}`}
          >
            {g}
          </button>
        ))}
      </div>
      {searching && <p className="text-blue-400">Searching...</p>}
      {searchError && <p className="text-red-500">{searchError}</p>}
      {searchQuery && (
        <button
          type="button"
          onClick={clearSearch}
          className="mb-4 px-4 py-1 bg-gray-500 text-white rounded"
        >
          Clear
        </button>
      )}
      {trending.length > 0 && (
        <Slider title="Trending">
          {trending.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </Slider>
      )}
      {trendingError && <p className="text-red-500 mb-2">{trendingError}</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
      {searchQuery && !searching && (
        <div className="flex justify-center items-center mt-4 gap-4">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className="bg-gray-700 px-4 py-2 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm text-gray-400">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            className="bg-gray-700 px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
      {hasMore && <div ref={loader} />}
    </div>
  );
};

export default Home;
