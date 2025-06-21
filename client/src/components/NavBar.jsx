import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const menuItems = (
    <>
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to="/library">Library</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-violet-800 p-4 fixed top-0 left-0 w-full z-50 flex justify-between items-center">
      <Link to="/" className="font-bold">MyMovies</Link>
      <div className="hidden sm:flex space-x-4 items-center">
        {menuItems}
      </div>
      <button className="sm:hidden" onClick={() => setOpen(o => !o)}>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
          />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 w-full sm:hidden bg-gradient-to-r from-purple-500 to-violet-800 flex flex-col items-center space-y-2 py-2">
          {menuItems}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
