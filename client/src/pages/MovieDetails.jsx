import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { api } from '../api.js';
import AddToWatchlistButton from '../components/movie/AddToWatchlistButton.jsx';
import AddToFavoritesButton from '../components/movie/AddToFavoritesButton.jsx';
import RatingStars from '../components/movie/RatingStars.jsx';
import ReviewList from '../components/movie/ReviewList.jsx';
import ReviewForm from '../components/movie/ReviewForm.jsx';
import SocialShareButtons from '../components/movie/SocialShareButtons.jsx';

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
`;

const Poster = styled.img`
  max-width: 300px;
  border-radius: 4px;
  align-self: center;
`;

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const [movieRes, videoRes] = await Promise.all([
          api.get(`movies/${id}`),
          api.get(`movies/${id}/videos`),
        ]);
        setMovie(movieRes.data);
        const ytVideo = (videoRes.data.results || []).find((v) => v.site === 'YouTube');
        setVideo(ytVideo || null);
      } catch (err) {
        console.error(err);
        setMovie(null);
        setVideo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    );
  }

  if (!movie) {
    return <div className="p-4">Movie not found</div>;
  }


  return (
    <Container>
      <Title>{movie.title}</Title>
      {video && (
        <iframe
          title="Trailer"
          src={`https://www.youtube.com/embed/${video.key}`}
          allowFullScreen
          className="w-full aspect-video"
        />
      )}
      {movie.poster_path && !video && (
        <Poster
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      )}
      {!video && <p>Trailer unavailable.</p>}
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <div className="flex gap-2 flex-wrap">
        {movie.genres?.map((g) => (
          <span key={g.id} className="bg-gray-700 px-2 py-1 rounded text-sm">
            {g.name}
          </span>
        ))}
      </div>
      {movie && (
        <>
          <div className="flex space-x-2 my-2">
            <AddToWatchlistButton
              movieId={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
            />
            <AddToFavoritesButton
              movieId={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
            />
          </div>
          <RatingStars movieId={movie.id} />
          <button
            onClick={() => setShowReviews(p => !p)}
            className="mb-4 font-semibold hover:underline"
          >
            {showReviews ? 'Hide reviews ▲' : 'Show reviews ▼'}
          </button>
          <div
            className={`transition-[max-height] duration-500 overflow-hidden ${showReviews ? 'max-h-[40rem]' : 'max-h-0'}`}
          >
            <ReviewList movieId={movie.id} />
          </div>
          <ReviewForm movieId={movie.id} />
          <SocialShareButtons movie={movie} />
        </>
      )}
    </Container>
  );
};

export default MovieDetails;
