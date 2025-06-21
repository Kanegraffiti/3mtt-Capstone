import { useState, useEffect } from 'react';

const OfflineBanner = () => {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);

  if (online) return null;
  return (
    <div className="bg-red-600 text-center py-2 text-sm">
      You are offline. Some features may be unavailable.
    </div>
  );
};

export default OfflineBanner;
