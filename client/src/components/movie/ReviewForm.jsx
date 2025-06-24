import { useState, useContext } from 'react';
import { api } from '../../api.js';
import { AuthContext } from '../../context/AuthContext.jsx';

const ReviewForm = ({ movieId, onSuccess }) => {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);

  if (!user) return null;

  const submit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await api.post(
        `reviews/${movieId}`,
        { comment, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComment('');
      setRating(5);
      onSuccess && onSuccess();
    } catch (err) {
      console.error('Add review failed:', err);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-2">
      <textarea
        className="w-full p-2 text-black"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Your review"
      />
      <select
        className="p-1 text-black"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
      <button className="bg-brand text-white px-2 py-1" type="submit">
        Submit
      </button>
    </form>
  );
};

export default ReviewForm;
