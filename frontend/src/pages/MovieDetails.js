import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState('');
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          { params: { api_key: process.env.REACT_APP_TMDB_KEY } }
        );
        setMovie(details.data);
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/reviews/movie/${id}`
        );
        setReviews(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  const submitReview = async () => {
    if (!text.trim()) return;
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/reviews`,
        { movieId: id, text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReviews([...reviews, res.data]);
      setText('');
    } catch (err) {
      console.error(err);
    }
  };

  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      <h2>{movie.title}</h2>
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
        />
      )}
      <p>{movie.overview}</p>

      <h3>Reviews</h3>
      <ul>
        {reviews.map((r) => (
          <li key={r._id}>
            {r.rating && <strong>{r.rating}/10 </strong>}
            {r.text}
          </li>
        ))}
      </ul>
      {token && (
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a review"
          />
          <button onClick={submitReview}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
