import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="bg-gray-800 p-4 flex justify-between">
      <div>
        <Link className="font-bold" to="/">MovieApp</Link>
      </div>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/watchlist">Watchlist</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
