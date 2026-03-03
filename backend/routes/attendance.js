const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const { checkRole } = require('../middleware/auth');

// Employee marks attendance
router.post('/mark', async (req, res) => {
  try {
    const { status, checkInTime, checkOutTime } = req.body;
    const today = new Date().setHours(0,0,0,0);

    // Check if already marked
    const existing = await Attendance.findOne({ employee: req.user.id, date: today });
    if (existing) return res.status(400).send('Attendance already marked for today');

    const attendance = new Attendance({
      employee: req.user.id,
      date: today,
      status,
      checkInTime,
      checkOutTime
    });
    await attendance.save();
    res.status(201).send('Attendance marked successfully');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Employee views their attendance
router.get('/my', async (req, res) => {
  try {
    const records = await Attendance.find({ employee: req.user.id });
    res.json(records);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Manager/HR/Admin views all attendance
router.get('/all', checkRole(['Manager','HR','Admin']), async (req, res) => {
  try {
    const records = await Attendance.find().populate('employee', 'name email role');
    res.json(records);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
