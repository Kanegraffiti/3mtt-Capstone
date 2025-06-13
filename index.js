const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let items = [
  { id: 1, name: 'Item One', description: 'First item' }
];
let nextId = 2;

function validateItem(req, res, next) {
  const { name, description } = req.body;
  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ message: 'Name is required' });
  }
  if (!description || typeof description !== 'string' || !description.trim()) {
    return res.status(400).json({ message: 'Description is required' });
  }
  next();
}

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/items', (req, res) => {
  res.json(items);
});

app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = items.find((i) => i.id === id);
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  res.json(item);
});

app.post('/items', validateItem, (req, res) => {
  const { name, description } = req.body;
  const item = { id: nextId++, name: name.trim(), description: description.trim() };
  items.push(item);
  res.status(201).json(item);
});

app.put('/items/:id', validateItem, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }
  const { name, description } = req.body;
  items[index] = { id, name: name.trim(), description: description.trim() };
  res.json(items[index]);
});

app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }
  items.splice(index, 1);
  res.json({ message: 'Item deleted' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
