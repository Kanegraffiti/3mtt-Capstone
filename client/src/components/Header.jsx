import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '/logo.svg';
import { AuthContext } from '../context/AuthContext.jsx';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-surface text-white p-5 w-full shadow-md fixed top-0 z-50">
      <div className="container mx-auto flex items-center justify-between flex-wrap">
        <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
          <img src={Logo} alt="CinemaFlix Logo" className="h-10 w-40 mr-3" />
        </div>
        <button className="block md:hidden text-white text-4xl" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
        <div className={`w-full md:flex md:items-center md:w-auto ${menuOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mt-4 md:mt-0 ml-auto">
            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-brand px-2 md:px-3">
              Home
            </Link>
            {user ? (
              <>
                <Link to="/library" onClick={() => setMenuOpen(false)} className="hover:text-brand px-2 md:px-3">
                  Library
                </Link>
                <Link to="/profile" onClick={() => setMenuOpen(false)} className="hover:text-brand px-2 md:px-3">
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="hover:text-brand px-2 md:px-3"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-brand px-2 md:px-3">
                  Login
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="hover:text-brand px-2 md:px-3">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
