import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

const Profile = () => {
  const { user, logout, updateProfile } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.user.name);
      setEmail(user.user.email);
    }
  }, [user]);
  if (!user) return <p className="p-4">Loading...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(name, email);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl mb-1">{user.user.name}</h2>
          <p>{user.user.email}</p>
        </div>
        <button onClick={logout} className="bg-red-500 px-4 py-1">Logout</button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-2 max-w-sm">
        <input className="w-full p-2 text-black" value={name} onChange={e => setName(e.target.value)} />
        <input className="w-full p-2 text-black" value={email} onChange={e => setEmail(e.target.value)} />
        <button className="w-full bg-blue-500 py-2" type="submit">Update</button>
      </form>
      <div>
        <h3 className="text-lg mb-2">Watchlists</h3>
        {user.watchlists.length === 0 && <p>No watchlists.</p>}
        <ul className="list-disc ml-6">
          {user.watchlists.map(l => (
            <li key={l._id}>{l.name} ({l.movies.length})</li>
          ))}
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
