const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send('User not found');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).send('Invalid password');

    const token = jwt.sign({ id: user._id, role: user.role }, 'secretKey');
    res.json({ token });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
