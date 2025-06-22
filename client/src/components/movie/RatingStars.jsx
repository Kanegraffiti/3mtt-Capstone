import { useEffect, useState, useContext } from 'react';
import { api } from '../../api.js';
import { AuthContext } from '../../context/AuthContext.jsx';
const RatingStars = ({ movieId }) => {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchRating = async () => {
      if (!user) return;
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const review = (res.data.reviews || []).find((r) => r.movieId === movieId);
        if (review) setRating(review.rating);
      } catch (err) {
        console.error('Fetch rating failed:', err);
      }
    };
    fetchRating();
  }, [movieId, user]);

  const submit = async (value) => {
    if (!user) return;
    setRating(value);
    try {
      const token = localStorage.getItem('token');
      await api.post(
        `reviews/${movieId}`,
        { rating: value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error('Rating failed:', err);
    }
  };

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          onClick={() => submit(i)}
          className="text-yellow-400"
        >
          {i <= rating ? '★' : '☆'}
        </button>
      ))}
    </div>
  );
};

export default RatingStars;
