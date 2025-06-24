import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import AvatarPicker from '../components/AvatarPicker.jsx';

const Profile = () => {
  const { user, logout, updateProfile } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('avatar1.png');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.user.name);
      setEmail(user.user.email);
      setAvatar(user.user.avatar || 'avatar1.png');
    }
  }, [user]);

  if (!user) return <p className="p-4">Loading...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    await updateProfile(name, email, avatar);
    setUpdating(false);
  };

  return (
    <div className="p-4 relative max-w-3xl mx-auto">
      <button
        onClick={logout}
        className="bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-md px-4 py-2 mt-4 sm:absolute sm:right-4 sm:top-4"
      >
        Logout
      </button>

      <div className="bg-surface p-6 rounded-3xl shadow-lg text-white grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-4">
          <AvatarPicker value={avatar} onChange={setAvatar} />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-lg font-medium">Name</label>
              <input
                className="w-full p-2 text-black"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-lg font-medium">Email</label>
              <input
                className="w-full p-2 text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={updating}
              className="w-full py-2 rounded text-white"
              style={{ backgroundColor: '#4f8bff', opacity: updating ? 0.5 : 1 }}
            >
              Update
            </button>
          </form>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-2">Lists</h3>
          <ul className="list-disc ml-6 space-y-1 text-lg font-medium">
            <li>Favourites ({user.favorites ? user.favorites.length : 0})</li>
            <li>Watchlist ({user.watchlists.length})</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-6 mb-2">Reviews</h3>
          {user.reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            <ul className="space-y-2">
              {user.reviews.map((r) => (
                <li key={r._id} className="border-b border-gray-700 pb-1">
                  {r.movieId}: {r.rating}/5 - {r.comment}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
