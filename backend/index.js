const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const taskRoutes = require('./routes/tasks');
require('dotenv').config(); // Load environment variables from .env file


const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors());
// Connect to MongoDB
mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use task routes
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
