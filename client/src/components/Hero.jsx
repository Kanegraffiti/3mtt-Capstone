import { useEffect, useState } from 'react';
import axios from 'axios';

const Hero = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('/movies/trending?page=1').then(res => setMovies(res.data.results.slice(0,10)));
  }, []);

  return (
    <div className="overflow-hidden py-8 mt-16">
      <h1 className="text-3xl font-semibold mb-4 text-center">Find Your Next Favorite Movie</h1>
      <div className="banner-container">
        <div className="scroll-banner">
          {movies.concat(movies).map((m, idx) => (
            <img
              key={idx}
              src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
              alt={m.title}
              className="h-64 w-auto object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
