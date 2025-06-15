import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/users/me`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [token]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>{user.name}'s Profile</h2>
      <p>Email: {user.email}</p>
      <h3>Your Watchlist</h3>
      <ul>
        {user.watchlist.map((id) => (
          <li key={id}>
            <Link to={`/movie/${id}`}>{id}</Link>
          </li>
        ))}
      </ul>
      <h3>Your Favorites</h3>
      <ul>
        {user.favorites.map((id) => (
          <li key={id}>
            <Link to={`/movie/${id}`}>{id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
