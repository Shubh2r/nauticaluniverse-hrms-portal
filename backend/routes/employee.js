const express = require('express');
const router = express.Router();

// Example employee route
router.get('/dashboard', (req, res) => {
  res.send(`Welcome ${req.user.role}, you can access employee dashboard`);
});

module.exports = router;

