// Load environment variables from .env
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employee');
const leaveRoutes = require('./routes/leave');
const attendanceRoutes = require('./routes/attendance'); 
const queryRoutes = require('./routes/query');   
const { verifyToken, checkRole } = require('./middleware/auth');

const app = express();
app.use(express.json());
app.use(cors());

// Use environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB Atlas (or local if you set it that way)
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/auth', authRoutes);
app.use('/employee', verifyToken, checkRole(['Employee','Manager','HR','Admin']), employeeRoutes);
app.use('/leave', verifyToken, leaveRoutes);
app.use('/attendance', verifyToken, attendanceRoutes);    
app.use('/query', verifyToken, queryRoutes);   

// Start server
app.listen(PORT, () => console.log(`🚀 HRMS backend running on port ${PORT}`));
