const express = require('express');
const path = require('path');
const jsonServer = require('json-server');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static Angular files (from dist/your-app-name)
app.use(express.static(path.join(__dirname, 'dist/app-game')));

// JSON Server at the root (http://localhost:3000/)
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
app.use(middlewares);
app.use('/', router); // All API routes now work at /

// Fallback to Angular for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/browser/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});