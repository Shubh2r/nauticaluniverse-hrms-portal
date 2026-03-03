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

// Manager/HR/Admin approves or rejects leave
router.put('/:id/decision', checkRole(['Manager','HR','Admin']), async (req, res) => {
  try {
    const { status, managerComment } = req.body;
    const leave = await LeaveRequest.findById(req.params.id);
    if (!leave) return res.status(404).send('Leave request not found');

    leave.status = status;
    leave.managerComment = managerComment;
    await leave.save();

    res.send(`Leave request ${status}`);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Employee views their leave requests
router.get('/my', async (req, res) => {
  try {
    const leaves = await LeaveRequest.find({ employee: req.user.id });
    res.json(leaves);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
