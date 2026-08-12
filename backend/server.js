const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/complaints', require('./routes/complaint'));
app.use('/api/lostfound', require('./routes/lostfound'));
app.use('/api/bookings', require('./routes/booking'));
app.use('/api/admin', require('./routes/admin'));

// Base Health Check
app.get('/', (req, res) => {
  res.send('CampusSetu Backend API is Running perfectly!');
});

// Database Connection & Server Init
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/campussetu';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Database Connected Successfully.');
    app.listen(PORT, () => console.log(`CampusSetu Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB Connection Failed:', err.message);
  });