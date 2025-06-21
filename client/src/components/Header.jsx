import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AuthContext } from '../context/AuthContext.jsx';
import MobileDrawer from './MobileDrawer.jsx';

const Header = () => {
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
    <header className="fixed top-0 w-full z-50 bg-gradient-to-r from-purple-700 to-blue-500 p-4 flex justify-between items-center">
      <Link to="/" className="font-bold">MyMovies</Link>
      <div className="hidden md:flex space-x-4 items-center">{menuItems}</div>
      <button className="md:hidden" onClick={() => setOpen(true)}>
        <HiMenu size={24} />
      </button>
      {open && <MobileDrawer close={() => setOpen(false)} />}
    </header>
  );
};

export default Header;
