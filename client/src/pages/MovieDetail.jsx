import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext.jsx';

const MovieDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`/movies/${id}`).then(res => setMovie(res.data));
    axios.get(`/movies/${id}/videos`).then(res => setVideos(res.data.results || []));
    axios.get(`/reviews/${id}`).then(res => setReviews(res.data));
  }, [id]);

  const addToWatchlist = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    await axios.post('/watchlist/add', { tmdbId: id, title: movie.title, posterPath: movie.poster_path }, { headers: { Authorization: `Bearer ${token}` } });
  };

  const submitReview = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return;
    await axios.post(`/reviews/${id}`, { rating, comment }, { headers: { Authorization: `Bearer ${token}` } });
    const res = await axios.get(`/reviews/${id}`);
    setReviews(res.data);
    setComment('');
    setRating(0);
  };

  if (!movie) return <p className="p-4">Loading...</p>;
  const trailer = videos.find(v => v.site === 'YouTube' && v.type === 'Trailer');

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl">{movie.title}</h2>
      {trailer && (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title="Trailer"
          allowFullScreen
        />
      )}
      {user && <button onClick={addToWatchlist} className="bg-blue-500 px-4 py-2">Add to Watchlist</button>}
      <p>{movie.overview}</p>
      <div>
        <h3 className="text-xl mb-2">Reviews</h3>
        {reviews.map(r => (
          <div key={r._id} className="mb-2 border-b border-gray-700 pb-2">
            <p className="font-bold">{r.userId.name} - {r.rating}/5</p>
            <p>{r.comment}</p>
          </div>
        ))}
      </div>
      {user && (
        <form onSubmit={submitReview} className="space-y-2">
          <div>
            <label className="mr-2">Rating:</label>
            <select value={rating} onChange={e => setRating(e.target.value)} className="text-black">
              <option value="0">0</option>
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <textarea className="w-full p-2 text-black" value={comment} onChange={e => setComment(e.target.value)} placeholder="Write a review" />
          <button className="bg-green-500 px-4 py-2" type="submit">Submit Review</button>
        </form>
      )}
    </div>
  );
};

export default MovieDetail;
