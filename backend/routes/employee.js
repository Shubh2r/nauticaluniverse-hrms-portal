const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Employee dashboard
router.get('/dashboard', (req, res) => {
  res.send(`Welcome ${req.user.role}, you can access employee dashboard`);
});

// Employee views their profile
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // exclude password
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Employee updates their profile (phone, address, etc.)
router.put('/profile', async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
