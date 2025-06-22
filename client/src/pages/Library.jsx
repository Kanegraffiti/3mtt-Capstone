import { useEffect, useState, useContext } from 'react';
import { api } from '../api.js';
import MovieCard from '../components/MovieCard.jsx';
import Slider from '../components/common/Slider.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import SmartRecommendations from '../components/SmartRecommendations.jsx';
import useMediaQuery from '../hooks/useMediaQuery.js';

const Library = () => {
  const { user, setUser } = useContext(AuthContext);
  const [lists, setLists] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem('token');
    api.get('watchlist', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setLists(res.data))
      .catch(() => setLists([]));
    api.get('favorites', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setFavorites(res.data.movies || []))
      .catch(() => setFavorites([]));
  }, [user]);

  const create = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await api.post('watchlist', { name, description }, { headers: { Authorization: `Bearer ${token}` } });
    setLists([...lists, res.data]);
    setUser({ ...user, watchlists: [...(user.watchlists || []), res.data] });
    setName('');
    setDescription('');
  };


  const removeMovie = async (listId, movieId) => {
    const token = localStorage.getItem('token');
    const res = await api.delete(`watchlist/${listId}/movies/${movieId}`, { headers: { Authorization: `Bearer ${token}` } });
    setLists(lists.map(l => l._id === listId ? { ...l, movies: res.data } : l));
    setUser({
      ...user,
      watchlists: user.watchlists.map(l => l._id === listId ? { ...l, movies: res.data } : l)
    });
  };

  const setStatus = async (listId, movieId, status) => {
    const token = localStorage.getItem('token');
    const res = await api.put(
      `/watchlist/${listId}/movies/${movieId}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setLists(lists.map(l =>
      l._id === listId ? {
        ...l,
        movies: l.movies.map(m =>
          m.tmdbId === movieId ? { ...m, status: res.data.status } : m
        )
      } : l
    ));
  };

  const delList = async (id) => {
    const token = localStorage.getItem('token');
    await api.delete(`watchlist/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    setLists(lists.filter(l => l._id !== id));
    setUser({ ...user, watchlists: user.watchlists.filter(l => l._id !== id) });
  };

  if (!user) return <p className="p-4">Please login</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">My Library</h2>

      {favorites.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg mb-2">Favorites</h3>
          <Slider>
            {favorites.map(m => (
              <MovieCard key={m.tmdbId} movie={{ id: m.tmdbId, title: m.title, poster_path: m.posterPath }} />
            ))}
          </Slider>
        </div>
      )}

      {isDesktop && <SmartRecommendations />}

      <h3 className="text-lg mb-2">Watchlists</h3>

      <form onSubmit={create} className="mb-6 space-x-2">
        <input className="p-1 text-black" value={name} onChange={e => setName(e.target.value)} placeholder="New list name" />
        <input className="p-1 text-black" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
        <button className="bg-blue-500 px-2" type="submit">Create</button>
      </form>

      {lists.length === 0 && <p>No watchlists yet.</p>}
      {lists.map(list => (
        <div key={list._id} className="mb-8">
          <div className="flex items-center mb-2 space-x-2">
            <h3 className="text-lg">{list.name}</h3>
            <button onClick={() => delList(list._id)} className="text-sm bg-red-500 px-2">Delete</button>
          </div>
          {list.description && <p className="mb-2 text-sm text-gray-300">{list.description}</p>}
          {list.movies.length === 0 && <p>No movies.</p>}
          <Slider>
            {list.movies.map(m => (
              <div key={m.tmdbId} style={{ position: 'relative' }}>
                <MovieCard movie={{ id: m.tmdbId, title: m.title, poster_path: m.posterPath }} />
                <button onClick={() => removeMovie(list._id, m.tmdbId)} style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: '#ef4444', fontSize: '0.875rem', padding: '0 0.25rem' }}>Remove</button>
                <select
                  value={m.status}
                  onChange={e => setStatus(list._id, m.tmdbId, e.target.value)}
                  style={{ position: 'absolute', bottom: '0.5rem', left: '0.5rem', color: 'black', fontSize: '0.75rem' }}
                >
                  <option value="To Watch">To Watch</option>
                  <option value="Watching">Watching</option>
                  <option value="Watched">Watched</option>
                </select>
              </div>
            ))}
          </Slider>
        </div>
      ))}

      {!isDesktop && <SmartRecommendations />}
    </div>
  );
};

export default Library;
