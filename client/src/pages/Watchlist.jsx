import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard.jsx';
import { AuthContext } from '../context/AuthContext.jsx';

const Watchlist = () => {
  const { user, setUser } = useContext(AuthContext);
  const [lists, setLists] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem('token');
    axios.get('/watchlist', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setLists(res.data))
      .catch(() => setLists([]));
  }, [user]);

  const create = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await axios.post('/watchlist', { name, description }, { headers: { Authorization: `Bearer ${token}` } });
    setLists([...lists, res.data]);
    setUser({ ...user, watchlists: [...(user.watchlists || []), res.data] });
    setName('');
    setDescription('');
  };


  const removeMovie = async (listId, movieId) => {
    const token = localStorage.getItem('token');
    const res = await axios.delete(`/watchlist/${listId}/movies/${movieId}`, { headers: { Authorization: `Bearer ${token}` } });
    setLists(lists.map(l => l._id === listId ? { ...l, movies: res.data } : l));
    setUser({
      ...user,
      watchlists: user.watchlists.map(l => l._id === listId ? { ...l, movies: res.data } : l)
    });
  };

  const delList = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`/watchlist/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    setLists(lists.filter(l => l._id !== id));
    setUser({ ...user, watchlists: user.watchlists.filter(l => l._id !== id) });
  };

  if (!user) return <p className="p-4">Please login</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">My Watchlists</h2>

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
          <div className="overflow-x-auto flex gap-4 pb-2">
            {list.movies.map(m => (
              <div key={m.tmdbId} className="relative">
                <MovieCard movie={{ id: m.tmdbId, title: m.title, poster_path: m.posterPath }} />
                <button onClick={() => removeMovie(list._id, m.tmdbId)} className="absolute top-2 right-2 bg-red-500 px-2 text-sm">Remove</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Watchlist;
