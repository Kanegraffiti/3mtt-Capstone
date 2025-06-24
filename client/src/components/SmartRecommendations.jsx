import { useContext, useEffect, useState } from 'react';
import { api } from '../api.js';
import MovieCard from './MovieCard.jsx';
import Slider from './common/Slider.jsx';
import { AuthContext } from '../context/AuthContext.jsx';

const SmartRecommendations = () => {
  const { user } = useContext(AuthContext);
  const [recommended, setRecommended] = useState([]);
  const [advanced, setAdvanced] = useState([]);

  useEffect(() => {
    if (!user) {
      setRecommended([]);
      setAdvanced([]);
      return;
    }
    const token = localStorage.getItem('token');
    api.get('movies/recommendations', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setRecommended(res.data.results || []))
      .catch(() => setRecommended([]));
    api.get('movies/recommendations/advanced', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setAdvanced(res.data.results || []))
      .catch(() => setAdvanced([]));
  }, [user]);

  if (!user) return null;

  return (
    <>
      {recommended.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg mb-2">Recommended for You</h3>
          <Slider>
            {recommended.map(m => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </Slider>
        </div>
      )}
      {advanced.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg mb-2">Top Picks</h3>
          <Slider>
            {advanced.map(m => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </Slider>
        </div>
      )}
    </>
  );
};

export default SmartRecommendations;
