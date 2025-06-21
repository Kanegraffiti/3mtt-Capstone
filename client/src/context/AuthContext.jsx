import { createContext, useState, useEffect } from 'react';
import { api } from '../api.js';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api
        .get('users/profile', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setUser(res.data))
        .catch(() => setUser(null));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      const profile = await api.get('users/profile', {
        headers: { Authorization: `Bearer ${res.data.token}` }
      });
      setUser(profile.data);
      return true;
    } catch (err) {
      console.error('Login failed:', err);
      return false;
    }
  };

  const register = async (name, email, password) => {
    try {
      await api.post('auth/register', { name, email, password });
      return true;
    } catch (err) {
      console.error('Registration failed:', err);
      return false;
    }
  };

  const updateProfile = async (name, email) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await api.put(
        'users/profile',
        { name, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data);
    } catch (err) {
      console.error('Profile update failed:', err);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, updateProfile, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
