const express = require('express');
const Progress = require('../models/progress');
const router = express.Router();

router.post('/', async (req, res) => {
  const { userId, date, weight, chest, arms, legs } = req.body;

  if (!userId || !date || !weight || !chest || !arms || !legs) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const result = await Progress.create(userId, date, weight, chest, arms, legs);
    res.status(201).json({ message: 'Progress record created', data: result });
  } catch (err) {
    res.status(500).json({ error: err.message || err });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const result = await Progress.getAll(req.params.userId);
    if (result.length === 0) {
      return res.status(404).json({ error: 'No progress records found for this user' });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message || err });
  }
});

router.get('/latest/:userId', async (req, res) => {
  try {
    const result = await Progress.getLatest(req.params.userId);
    if (result.length === 0) {
      return res.status(404).json({ error: 'No progress records found for this user' });
    }
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message || err });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { weight, chest, arms, legs } = req.body;

  if (weight == null || chest == null || arms == null || legs == null) {
    return res.status(400).json({ error: 'All fields (weight, chest, arms, legs) are required.' });
  }

  try {
    const result = await Progress.updateById(id, weight, chest, arms, legs);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Progress record not found or no changes made.' });
    }
    res.json({ message: 'Progress updated successfully', result });
  } catch (error) {
    console.error("Error in PUT /progress/:id:", error.message);
    res.status(500).json({ error: 'An error occurred while updating progress.' });
  }
});

router.delete('/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!userId || isNaN(userId)) {
    return res.status(400).json({ error: 'Valid userId is required' });
  }

  try {
    const result = await Progress.deleteByUserId(userId);

    await Progress.resetAutoIncrement(); 

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'No progress records found for this user' });
    }

    res.status(200).json({ message: 'All progress records deleted successfully' });
  } catch (err) {
    console.error('Error during deletion:', err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
});

router.delete('/progress/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Progress.deleteByProgressId(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Progress record not found' });
    }

    res.status(200).json({ message: 'Progress record deleted successfully' });
  } catch (err) {
    console.error('Error during deletion:', err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
});

module.exports = router;
