import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api.js';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext.jsx';
import Rating from '../components/common/Rating.jsx';
import Placeholder from '../components/common/Placeholder.jsx';
import Spinner from '../components/common/Spinner.jsx';
import NotFound from './NotFound.jsx';
import { BASE_URL } from '../api.js';
import { FaTwitter, FaWhatsapp, FaFacebook, FaLink } from 'react-icons/fa';

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
`;

const ReviewSection = styled.div``;

const ReviewItem = styled.div`
  margin-bottom: 0.5rem;
  border-bottom: 1px solid #374151;
  padding-bottom: 0.5rem;
`;

const ReviewForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MovieDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [providers, setProviders] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const shareText = (movie) =>
    `${movie.title} - ${movie.tagline || movie.overview?.slice(0, 100) || ''} ${window.location.href}`;

  const shareWhatsapp = () => {
    if (!movie) return;
    const text = encodeURIComponent(shareText(movie));
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const shareTwitter = () => {
    if (!movie) return;
    const text = encodeURIComponent(shareText(movie));
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const shareFacebook = () => {
    if (!movie) return;
    const url = encodeURIComponent(window.location.href);
    const quote = encodeURIComponent(`${movie.title} - ${movie.tagline || movie.overview?.slice(0, 100) || ''}`);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`, '_blank');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setNotFound(false);
        const res = await fetch(`${BASE_URL}/movies/${id}`);
        if (res.status === 404) {
          setNotFound(true);
          return;
        }
        const data = await res.json();
        setMovie(data);

        const [vid, prov, rev] = await Promise.all([
          api.get(`movies/${id}/videos`),
          api.get(`movies/${id}/providers`),
          api.get(`reviews/${id}`)
        ]);
        setVideos(vid.data.results || []);
        const provArr = Object.values(prov.data.results?.US?.flatrate || []);
        setProviders(provArr);
        setReviews(rev.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const addToWatchlist = async () => {
    const token = localStorage.getItem('token');
    if (!token || !user || !user.watchlists || user.watchlists.length === 0) return;
    const listId = user.watchlists[0]._id;
    await api.post(`watchlist/${listId}/add`, { tmdbId: id, title: movie.title, posterPath: movie.poster_path }, { headers: { Authorization: `Bearer ${token}` } });
  };

  const addToFavorites = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    await api.post('favorites/add', { tmdbId: id, title: movie.title, posterPath: movie.poster_path }, { headers: { Authorization: `Bearer ${token}` } });
  };

  const submitReview = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return;
    await api.post(`reviews/${id}`, { rating, comment }, { headers: { Authorization: `Bearer ${token}` } });
    const res = await api.get(`reviews/${id}`);
    setReviews(res.data);
    setComment('');
    setRating(0);
  };

  if (loading) {
    return <Spinner />;
  }
  if (notFound) {
    return <NotFound />;
  }
  if (!movie) {
    return (
      <div style={{ padding: '1rem' }}>
        <Placeholder height="2rem" />
      </div>
    );
  }
  const trailer = videos.find(v => v.site === 'YouTube' && v.type === 'Trailer');

  return (
    <Container>
      <Title>{movie.title}</Title>
      <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
      <p>Rating: {movie.vote_average}</p>
      {trailer && (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title="Trailer"
          allowFullScreen
        />
      )}
      {user && (
        <div className="flex gap-2">
          <button onClick={addToWatchlist} style={{ background: '#3b82f6', padding: '0.5rem 1rem' }}>Add to Watchlist</button>
          <button onClick={addToFavorites} style={{ background: '#f59e0b', padding: '0.5rem 1rem' }}>Favorite</button>
        </div>
      )}
      {providers.length > 0 && (
        <div className="flex gap-2 my-2">
          {providers.map(p => (
            <a key={p.provider_id} href={p.link || '#'} target="_blank" rel="noopener noreferrer">
              <img src={`https://image.tmdb.org/t/p/w45${p.logo_path}`} alt={p.provider_name} />
            </a>
          ))}
        </div>
      )}
      <p>{movie.overview}</p>
      <div className="flex gap-4 my-2 items-center">
        <button
          onClick={shareWhatsapp}
          title="Share on WhatsApp"
          aria-label="Share on WhatsApp"
          className="text-green-500 hover:text-green-400"
        >
          <FaWhatsapp size={24} />
          <span className="sr-only">Share on WhatsApp</span>
        </button>
        <button
          onClick={shareTwitter}
          title="Share on Twitter"
          aria-label="Share on Twitter"
          className="text-blue-400 hover:text-blue-300"
        >
          <FaTwitter size={24} />
          <span className="sr-only">Share on Twitter</span>
        </button>
        <button
          onClick={shareFacebook}
          title="Share on Facebook"
          aria-label="Share on Facebook"
          className="text-blue-600 hover:text-blue-500"
        >
          <FaFacebook size={24} />
          <span className="sr-only">Share on Facebook</span>
        </button>
        <button
          onClick={copyLink}
          title="Copy link"
          aria-label="Copy link"
          className="text-gray-400 hover:text-gray-300"
        >
          <FaLink size={24} />
          <span className="sr-only">Copy link</span>
        </button>
      </div>
      <ReviewSection>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Reviews</h3>
        {reviews.map(r => (
          <ReviewItem key={r._id}>
            <p style={{ fontWeight: 'bold' }}>{r.userId.name} - <Rating value={r.rating} /></p>
            <p>{r.comment}</p>
          </ReviewItem>
        ))}
      </ReviewSection>
      {user && (
        <ReviewForm onSubmit={submitReview}>
          <div>
            <label style={{ marginRight: '0.5rem' }}>Rating:</label>
            <select value={rating} onChange={e => setRating(Number(e.target.value))} style={{ color: 'black' }}>
              <option value="0">0</option>
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <textarea style={{ padding: '0.5rem', color: 'black' }} value={comment} onChange={e => setComment(e.target.value)} placeholder="Write a review" />
          <button style={{ background: '#10b981', padding: '0.5rem 1rem' }} type="submit">Submit Review</button>
        </ReviewForm>
      )}
    </Container>
  );
};

export default MovieDetail;
