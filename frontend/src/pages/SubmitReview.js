import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const SubmitReview = () => {
  const [formData, setFormData] = useState({ movieId: '', rating: '', text: '' });
  const [message, setMessage] = useState('');
  const { token } = useContext(AuthContext);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/reviews`,
        {
          movieId: formData.movieId,
          rating: Number(formData.rating),
          text: formData.text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Review submitted!');
      setFormData({ movieId: '', rating: '', text: '' });
    } catch (err) {
      console.error(err);
      setMessage('Submission failed');
    }
  };

  return (
    <div>
      <h2>Submit Review</h2>
      {message && <p>{message}</p>}
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="number"
            name="movieId"
            placeholder="Movie ID"
            value={formData.movieId}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <input
            type="number"
            name="rating"
            placeholder="Rating (1-10)"
            value={formData.rating}
            onChange={onChange}
          />
        </div>
        <div>
          <textarea
            name="text"
            placeholder="Your review"
            value={formData.text}
            onChange={onChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SubmitReview;
