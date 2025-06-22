import { useState, useEffect } from 'react';

const useMediaQuery = (query) => {
  const getMatches = () =>
    typeof window !== 'undefined' && window.matchMedia(query).matches;
  const [matches, setMatches] = useState(getMatches());

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener ? media.addEventListener('change', listener) : media.addListener(listener);
    return () => {
      media.removeEventListener ? media.removeEventListener('change', listener) : media.removeListener(listener);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
