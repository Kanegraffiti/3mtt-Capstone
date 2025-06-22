import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const Register = () => {
  const { register, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(name, email, password);
    if (success) {
      await login(email, password);
      navigate('/profile');
    } else {
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-sm mx-auto space-y-4">
      <input className="w-full p-2 text-black" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input className="w-full p-2 text-black" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" className="w-full p-2 text-black" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button
        className="w-full bg-purple-600 text-white px-4 py-1 rounded"
        type="submit"
      >
        Register
      </button>
    </form>
  );
};

export default Register;
