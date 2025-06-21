import { Link } from 'react-router-dom';
import { useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { AuthContext } from '../context/AuthContext.jsx';

const slideDown = keyframes`
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
`;

const Bar = styled.nav`
  background: linear-gradient(to right, #9b5de5, #52057b);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  animation: ${slideDown} 0.3s ease-out;
`;

const Links = styled.div`
  & > a, & > button {
    margin-left: 1rem;
  }
`;

const Brand = styled(Link)`
  font-weight: bold;
`;

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <Bar>
      <Brand to="/">MyMovies</Brand>
      <Links>
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
      </Links>
    </Bar>
  );
};

export default NavBar;
