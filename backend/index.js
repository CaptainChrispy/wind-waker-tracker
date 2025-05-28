// backend/index.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

const slidingPuzzleSolver = require('./slidingPuzzleSolver');
app.use('/api/solve-sliding-puzzle', slidingPuzzleSolver);

// Catch-all for 404s
app.use((req, res) => {
  res.status(404).send('Not found');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
