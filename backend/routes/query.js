// HR/Admin closes a query
router.put('/:id/close', checkRole(['HR','Admin']), async (req, res) => {
  try {
    const query = await Query.findById(req.params.id);
    if (!query) return res.status(404).send('Query not found');

    query.status = 'Closed';
    query.hrResponse = req.body.hrResponse || 'Ticket closed by HR/Admin';
    await query.save();

    res.send('Query closed successfully');
  } catch (err) {
    res.status(400).send(err.message);
  }
});
