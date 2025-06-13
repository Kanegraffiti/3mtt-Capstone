const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());

app.get('/users', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/users/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/users', async (req, res) => {
  const { name, email, age } = req.body;
  if (!name || !email || age === undefined) {
    return res.status(400).json({ error: 'Missing name, email or age' });
  }
  try {
    const { rows } = await pool.query(
      'INSERT INTO users(name, email, age) VALUES($1, $2, $3) RETURNING *',
      [name, email, age]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/users/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, email, age } = req.body;
  if (isNaN(id) || !name || !email || age === undefined) {
    return res.status(400).json({ error: 'Invalid or missing data' });
  }
  try {
    const { rowCount, rows } = await pool.query(
      'UPDATE users SET name=$1, email=$2, age=$3 WHERE id=$4 RETURNING *',
      [name, email, age, id]
    );
    if (rowCount === 0) return res.status(404).json({ error: 'User not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/users/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
  try {
    const { rowCount } = await pool.query('DELETE FROM users WHERE id=$1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
