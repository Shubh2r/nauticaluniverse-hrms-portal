const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const { checkRole } = require('../middleware/auth');

// Employee views their attendance
router.get('/my', async (req, res) => {
  try {
    const records = await Attendance.find({ employee: req.user.id });
    res.json(records);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Admin/HR marks attendance
router.post('/mark', checkRole(['HR','Admin']), async (req, res) => {
  try {
    const { employeeId, date, status, checkIn, checkOut } = req.body;
    const attendance = new Attendance({
      employee: employeeId,
      date,
      status,
      checkIn,
      checkOut
    });
    await attendance.save();
    res.status(201).send('Attendance marked successfully');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Admin/HR view all attendance
router.get('/all', checkRole(['HR','Admin']), async (req, res) => {
  try {
    const records = await Attendance.find().populate('employee','name email');
    res.json(records);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
