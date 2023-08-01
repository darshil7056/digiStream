// src/index.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS
app.use(cors());
app.use(express.json());

// Import the routes
const authRoutes = require('./src/routes/authRoutes');

// Use the routes
app.use('/api', authRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
