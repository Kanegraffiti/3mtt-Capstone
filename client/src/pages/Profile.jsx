import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  if (!user) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl mb-1">{user.user.name}</h2>
          <p>{user.user.email}</p>
        </div>
        <button onClick={logout} className="bg-red-500 px-4 py-1">Logout</button>
      </div>
      <div>
        <h3 className="text-lg mb-2">Watchlist</h3>
        {user.watchlist.length === 0 && <p>No movies saved.</p>}
        <ul className="list-disc ml-6">
          {user.watchlist.map(m => <li key={m.tmdbId}>{m.title}</li>)}
        </ul>
      </div>
      <div>
        <h3 className="text-lg mb-2">My Reviews</h3>
        {user.reviews.length === 0 && <p>No reviews yet.</p>}
        <ul className="space-y-2">
          {user.reviews.map(r => (
            <li key={r._id} className="border-b border-gray-700 pb-1">
              {r.movieId}: {r.rating}/5 - {r.comment}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
