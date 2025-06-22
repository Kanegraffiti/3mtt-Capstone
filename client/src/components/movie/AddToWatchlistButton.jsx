import { useContext } from 'react';
import { api } from '../../api.js';
import { AuthContext } from '../../context/AuthContext.jsx';

const AddToWatchlistButton = ({ movieId, title, posterPath }) => {
  const { user } = useContext(AuthContext);

  const addWatchlist = async () => {
    if (!user || !user.watchlists || user.watchlists.length === 0) return;
    const token = localStorage.getItem('token');
    const listId = user.watchlists[0]._id;
    try {
      await api.post(
        `watchlist/${listId}/add`,
        { tmdbId: movieId, title, posterPath },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error('Add to watchlist failed:', err);
    }
  };

  return (
    <button
      onClick={addWatchlist}
      className="bg-brand hover:bg-brand/90 text-white px-3 py-1 text-sm"
    >
      Watchlist
    </button>
  );
};

export default AddToWatchlistButton;
