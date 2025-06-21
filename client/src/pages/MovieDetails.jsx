import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { api } from '../api.js';
import Spinner from '../components/common/Spinner.jsx';

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
`;

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [movieRes, videoRes] = await Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.REACT_APP_TMDB_API_KEY}`
          ),
          api.get(`movies/${id}/videos`),
        ]);
        setMovie(movieRes.data);
        const ytVideo = (videoRes.data.results || []).find(
          (v) => v.site === 'YouTube'
        );
        setVideo(ytVideo || null);
      } catch (err) {
        console.error(err);
        setMovie(null);
        setVideo(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <Spinner />;
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
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <div className="flex gap-2 flex-wrap">
        {movie.genres?.map((g) => (
          <span key={g.id} className="bg-gray-700 px-2 py-1 rounded text-sm">
            {g.name}
          </span>
        ))}
      </div>
    </Container>
  );
};

export default MovieDetails;
