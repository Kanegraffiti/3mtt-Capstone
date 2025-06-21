import NavBar from './components/NavBar.jsx';
import OfflineBanner from './components/OfflineBanner.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import Library from './pages/Library.jsx';
import MovieDetail from './pages/MovieDetail.jsx';
import SharedList from './pages/SharedList.jsx';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <OfflineBanner />
      <div className="pt-16 pb-20">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/library" element={<Library />} />
        </Route>
        <Route path="/list/:id" element={<SharedList />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
      </div>
      <footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-center py-4 text-sm opacity-80">
        <a href="https://github.com/kelechinx" target="_blank" rel="noopener noreferrer" className="underline">Built with ❤️ by Kelechi Nwankwo</a>
      </footer>
    </AuthProvider>
  );
}

export default App;
