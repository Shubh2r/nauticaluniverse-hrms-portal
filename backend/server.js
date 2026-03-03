const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employee');
const { verifyToken, checkRole } = require('./middleware/auth');

const app = express();
app.use(express.json());

// Connect to MongoDB (later we’ll set up MongoDB Atlas free account)
mongoose.connect('mongodb://localhost/hrms', { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.use('/auth', authRoutes);
app.use('/employee', verifyToken, checkRole(['Employee','Manager','HR','Admin']), employeeRoutes);

app.listen(5000, () => console.log('HRMS backend running on port 5000'));

