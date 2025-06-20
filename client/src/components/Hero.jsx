import { useEffect, useState } from 'react';
import axios from 'axios';

const Hero = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('/movies/trending').then(res => setMovies(res.data.results.slice(0,3)));
  }, []);

  return (
    <div className="text-center py-8 overflow-hidden">
      <h1 className="text-3xl font-semibold mb-4">Find Your Next Favorite Movie</h1>
      <div className="flex gap-4 justify-center animate-[scroll_20s_linear_infinite]">
        {movies.map(m => (
          <img key={m.id} src={`https://image.tmdb.org/t/p/w200${m.poster_path}`} alt={m.title} className="w-32 rounded" />
        ))}
      </div>
    </div>
  );
};

export default Hero;
