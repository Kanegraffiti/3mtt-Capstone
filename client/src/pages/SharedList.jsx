import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api.js';
import MovieCard from '../components/MovieCard.jsx';

const SharedList = () => {
  const { id } = useParams();
  const [list, setList] = useState(null);

  useEffect(() => {
    api.get(`watchlist/shared/${id}`)
      .then(res => setList(res.data))
      .catch(() => setList(null));
  }, [id]);

  if (!list) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">{list.name} - {list.user.name}</h2>
      {list.description && <p className="mb-4 text-sm text-gray-300">{list.description}</p>}
      {list.movies.length === 0 && <p>No movies.</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {list.movies.map(m => (
          <MovieCard key={m.tmdbId} movie={{ id: m.tmdbId, title: m.title, poster_path: m.posterPath }} />
        ))}
      </div>
    </div>
  );
};

export default SharedList;
