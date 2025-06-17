import { Link } from 'react-router-dom';
import { useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { AuthContext } from '../context/AuthContext.jsx';

const slideDown = keyframes`
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
`;

const Bar = styled.nav`
  background: #1f2937;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
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
      <Brand to="/">MovieApp</Brand>
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
