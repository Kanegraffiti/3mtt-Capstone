import { useState, useEffect } from 'react';
import ListComponent from './components/ListComponent.jsx';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch(() => setError('Failed to load users.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="message">Loading...</div>;
  }

  if (error) {
    return <div className="message">{error}</div>;
  }

  return (
    <div className="app">
      <h1>User List</h1>
      <ListComponent
        items={users}
        fallback="No users found."
        renderItem={(user) => <div>{user.name}</div>}
      />
    </div>
  );
}

export default App;
