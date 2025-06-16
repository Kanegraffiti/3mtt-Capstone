import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

const Profile = () => {
  const { user } = useContext(AuthContext);
  if (!user) return <p className="p-4">Loading...</p>;
  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};

export default Profile;
