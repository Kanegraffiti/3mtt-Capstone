import { useEffect, useState } from 'react';
import { api } from '../../api.js';

const ReviewList = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get(`reviews/${movieId}`);
        setReviews(res.data);
      } catch (err) {
        console.error('Fetch reviews failed:', err);
        setReviews([]);
      }
    };
    fetchReviews();
  }, [movieId]);

  if (reviews.length === 0) {
    return <p>No reviews yet.</p>;
  }

  return (
    <ul className="space-y-2">
      {reviews.map((r) => (
        <li key={r.id || r._id} className="border-b border-gray-700 pb-1">
          <strong>{r.author || r.userId}</strong>: {r.comment || r.content}
        </li>
      ))}
    </ul>
  );
};

export default ReviewList;
