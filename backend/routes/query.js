const express = require('express');
const router = express.Router();
const Query = require('../models/Query');
const { checkRole } = require('../middleware/auth');

// Employee raises a query
router.post('/raise', async (req, res) => {
  try {
    const { subject, description } = req.body;
    const query = new Query({
      employee: req.user.id,
      subject,
      description
    });
    await query.save();
    res.status(201).send('Query raised successfully');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Employee views their queries
router.get('/my', async (req, res) => {
  try {
    const queries = await Query.find({ employee: req.user.id });
    res.json(queries);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// HR responds to query
router.put('/:id/respond', checkRole(['HR','Admin']), async (req, res) => {
  try {
    const { hrResponse, status } = req.body;
    const query = await Query.findById(req.params.id);
    if (!query) return res.status(404).send('Query not found');

    query.hrResponse = hrResponse;
    query.status = status || 'In Progress';
    await query.save();

    res.send('Response submitted');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// HR views all queries
router.get('/all', checkRole(['HR','Admin']), async (req, res) => {
  try {
    const queries = await Query.find().populate('employee','name email');
    res.json(queries);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
