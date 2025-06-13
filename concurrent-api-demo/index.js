const express = require('express');
const app = express();
const PORT = 3000;

app.get('/ping', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

app.get('/data', (req, res) => {
  // simulate async database call
  setTimeout(() => {
    res.json({ data: 'Here is your data', fetchedAt: Date.now() });
  }, 100);
});

app.get('/heavy', (req, res) => {
  // simulate a slow task with a 5-second delay
  setTimeout(() => {
    res.json({ message: 'Heavy task complete', finishedAt: Date.now() });
  }, 5000);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
