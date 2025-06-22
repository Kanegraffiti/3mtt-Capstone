import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

export default function AuthForm({ mode = 'login' }) {
  const { login, register } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(mode === 'login');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let success = false;
    if (isLogin) {
      success = await login(formData.email, formData.password);
      if (success) {
        navigate('/profile');
      } else {
        setMessage('Invalid email or password');
      }
    } else {
      success = await register(formData.name, formData.email, formData.password);
      if (success) {
        setMessage('Registration successful! Please log in.');
        setIsLogin(true);
      } else {
        setMessage('Registration failed');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-surface p-6 rounded-3xl shadow-xl text-white">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? "Login to CiFlix" : "Create Your Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-surface placeholder-gray-400 rounded-3xl text-white"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-3xl bg-surface placeholder-gray-400 text-white"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-3xl bg-surface placeholder-gray-400 text-white"
            required
          />

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 p-3 rounded-3xl font-semibold transition cursor-pointer"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-red-400">{message}</p>
        )}

        <div className="mt-4 text-center">
          <button
            onClick={toggleForm}
            className="text-sm text-blue-400 hover:underline cursor-pointer"
          >
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
