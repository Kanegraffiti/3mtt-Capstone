import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <h1 className="logo">MovieApp</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {token && <Link to="/watchlist">Watchlist</Link>}
        {token && <Link to="/favorites">Favorites</Link>}
        {token && <Link to="/profile">Profile</Link>}
        {token && <Link to="/submit-review">Review</Link>}
        {!token && <Link to="/login">Login</Link>}
        {!token && <Link to="/register">Register</Link>}
        {token && (
          <button onClick={handleLogout} className="link-button">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
