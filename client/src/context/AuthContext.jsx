import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/users/profile', { headers: { Authorization: `Bearer ${token}` }})
        .then(res => setUser(res.data))
        .catch(() => setUser(null));
    }
  }, []);

  const login = async (email, password) => {
    const res = await axios.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    const profile = await axios.get('/users/profile', { headers: { Authorization: `Bearer ${res.data.token}` }});
    setUser(profile.data);
  };

  const register = async (name, email, password) => {
    await axios.post('/auth/register', { name, email, password });
  };

  const updateProfile = async (name, email) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const res = await axios.put('/users/profile', { name, email }, { headers: { Authorization: `Bearer ${token}` } });
    setUser(res.data);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };
  
  return (
return (
  <AuthContext.Provider value={{ user, login, register, logout, updateProfile, setUser }}>
    {children}
  </AuthContext.Provider>
);

      {children}
    </AuthContext.Provider>
  );
};
