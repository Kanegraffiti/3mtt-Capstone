import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const Register = () => {
  const { register, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Registering...');
    const success = await register(name, email, password);
    if (success) {
      setStatus('Registration successful');
      await login(email, password);
      navigate('/profile');
    } else {
      setStatus('Registration failed');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-sm mx-auto space-y-4">
      <input className="w-full p-2 text-black rounded" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input className="w-full p-2 text-black rounded" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" className="w-full p-2 text-black rounded" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button
        className="w-full bg-purple-600 text-white px-4 py-1 rounded disabled:opacity-50"
        disabled={loading}
        type="submit"
      >
        {loading ? 'Loading...' : 'Register'}
      </button>
      {status && <p className="text-center text-sm text-blue-300 mt-2">{status}</p>}
    </form>
  );
};

export default Register;
