import NavBar from './components/NavBar.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import Watchlist from './pages/Watchlist.jsx';
import MovieDetail from './pages/MovieDetail.jsx';
import SharedList from './pages/SharedList.jsx';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Route>
        <Route path="/list/:id" element={<SharedList />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
