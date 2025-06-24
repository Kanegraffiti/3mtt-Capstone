import { useContext } from 'react';
import { api } from '../../api.js';
import { AuthContext } from '../../context/AuthContext.jsx';

const AddToFavoritesButton = ({ movieId, title, posterPath }) => {
  const { user } = useContext(AuthContext);

  const addFavorite = async () => {
    if (!user) return;
    const token = localStorage.getItem('token');
    try {
      await api.post(
        'favorites/add',
        { tmdbId: movieId, title, posterPath },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error('Add favorite failed:', err);
    }
  };

  return (
    <button
      onClick={addFavorite}
      className="bg-brand hover:bg-brand/90 text-white px-3 py-1 text-sm"
    >
      Favorite
    </button>
  );
};

export default AddToFavoritesButton;
