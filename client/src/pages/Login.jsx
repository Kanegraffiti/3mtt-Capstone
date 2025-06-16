import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-sm mx-auto space-y-4">
      <input className="w-full p-2 text-black" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" className="w-full p-2 text-black" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button className="w-full bg-blue-500 py-2" type="submit">Login</button>
    </form>
  );
};

export default Login;
