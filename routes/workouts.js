const express = require('express');
const Workout = require('../models/workout');
const router = express.Router();

router.post('/', async (req, res) => {
  const { userId, type, exercise, sets, reps, weight } = req.body;

  if (!userId || !type || !exercise || !sets || !reps || !weight) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const result = await Workout.create(userId, type, exercise, sets, reps, weight);
    res.status(201).json({ message: 'Workout record created', data: result });
  } catch (err) {
    res.status(500).json({ error: err.message || err });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const result = await Workout.getAll(req.params.userId);
    if (result.length === 0) {
      return res.status(404).json({ error: 'No workout records found for this user' });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message || err });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Workout.getById(id);
    if (!result) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message || err });
  }
});

router.put('/:id', async (req, res) => {
  const { type, exercise, sets, reps, weight } = req.body;

  if (!type || !exercise || !sets || !reps || !weight) {
    return res.status(400).json({ error: 'All fields are required to update' });
  }

  try {
    const result = await Workout.update(req.params.id, type, exercise, sets, reps, weight);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.status(200).json({ message: 'Workout updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message || err });
  }
});

router.delete('/:id', async (req, res) => {
  const workoutId = req.params.id;

  try {
    const result = await Workout.delete(workoutId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message || err });
  }
});

router.delete('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await Workout.deleteByUserId(userId);
    res.status(200).json({ message: 'All workouts deleted for user' });
  } catch (err) {
    res.status(500).json({ error: err.message || err });
  }
});

module.exports = router;
