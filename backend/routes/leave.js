const express = require('express');
const router = express.Router();
const LeaveRequest = require('../models/LeaveRequest');
const { checkRole } = require('../middleware/auth');

// Employee applies for leave
router.post('/apply', async (req, res) => {
  try {
    const { startDate, endDate, reason } = req.body;
    const leave = new LeaveRequest({
      employee: req.user.id,
      startDate,
      endDate,
      reason
    });
    await leave.save();
    res.status(201).send('Leave request submitted');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Employee views their leaves
router.get('/my', async (req, res) => {
  try {
    const leaves = await LeaveRequest.find({ employee: req.user.id });
    res.json(leaves);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Employee cancels leave (only if still Pending)
router.put('/:id/cancel', async (req, res) => {
  try {
    const leave = await LeaveRequest.findById(req.params.id);
    if (!leave) return res.status(404).send('Leave not found');
    if (leave.status !== 'Pending') return res.status(400).send('Cannot cancel after approval/rejection');

    leave.status = 'Rejected'; // treat cancelled as rejected
    leave.managerComment = 'Cancelled by employee before approval';
    await leave.save();
    res.send('Leave request cancelled');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Manager/HR approves or rejects leave
router.put('/:id/respond', checkRole(['Manager','HR','Admin']), async (req, res) => {
  try {
    const { approve, comment } = req.body;
    const leave = await LeaveRequest.findById(req.params.id);
    if (!leave) return res.status(404).send('Leave not found');

    leave.status = approve ? 'Approved' : 'Rejected';
    leave.managerComment = comment || '';
    await leave.save();

    res.send(`Leave ${approve ? 'approved' : 'rejected'}`);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Manager/HR views all leave requests
router.get('/all', checkRole(['Manager','HR','Admin']), async (req, res) => {
  try {
    const leaves = await LeaveRequest.find().populate('employee','name email');
    res.json(leaves);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
