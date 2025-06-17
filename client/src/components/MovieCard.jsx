import { Link } from 'react-router-dom';
import { useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext.jsx';

const Card = styled(Link)`
  background: #374151;
  padding: 0.5rem;
  border-radius: 0.25rem;
  display: block;
  position: relative;
  text-decoration: none;
  color: inherit;
`;

const Title = styled.h3`
  margin-top: 0.5rem;
  text-align: center;
`;

const AddButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: #3b82f6;
  font-size: 0.75rem;
  padding: 0 0.25rem;
`;
const MovieCard = ({ movie }) => {
  const { user } = useContext(AuthContext);

  const add = async (e) => {
    e.preventDefault();
    if (!user || !user.watchlists || user.watchlists.length === 0) return;
    const token = localStorage.getItem('token');
    const listId = user.watchlists[0]._id;
    await axios.post(`/watchlist/${listId}/add`, { tmdbId: movie.id, title: movie.title, posterPath: movie.poster_path }, { headers: { Authorization: `Bearer ${token}` } });
  };

  return (
    <Card to={`/movie/${movie.id}`}> 
      <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
      <Title>{movie.title}</Title>
      {user && <AddButton onClick={add}>Add</AddButton>}
    </Card>
  );
};
export default MovieCard;
