const express = require('express');
const router = express.Router();  // Initialize the router here
const Progress = require('../models/progress');
const Workout = require('../models/workout');
const MealPlan = require('../models/mealPlan');
const User = require('../models/user');

// POST route to create a new user
router.post('/', (req, res) => {
  const { name, age, height, weight, goal } = req.body;
  User.create(name, age, height, weight, goal)
    .then(result => res.status(201).json(result))
    .catch(err => res.status(500).json({ error: err }));
});

// GET route to retrieve all users
router.get('/', (req, res) => {
  User.getAll()
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).json({ error: err.message || err }));
});

// GET route to retrieve user by ID
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;

  // Validate the userId to ensure it's a valid number
  if (!userId || isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid userId' });
  }

  User.getById(userId)
    .then(result => {
      if (result.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(result[0]); // Send the first user (if multiple results, pick the first one)
    })
    .catch(err => res.status(500).json({ error: err.message || err }));
});

// PUT route to update user by ID
router.put('/:userId', (req, res) => {
  const userId = req.params.userId;
  const { name, age, height, weight, goal } = req.body;

  // Validate userId and ensure all fields are provided
  if (!userId || isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid userId' });
  }

  if (!name || !age || !height || !weight || !goal) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  User.update(userId, name, age, height, weight, goal)
    .then(result => {
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ message: 'User updated successfully' });
    })
    .catch(err => res.status(500).json({ error: err.message || err }));
});

// DELETE route to delete user by ID
router.delete('/:userId', async (req, res) => {
  const { userId } = req.params;

  // Validate userId
  if (!userId || isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid userId' });
  }

  try {
    console.log(`Attempting to delete user and related data for userId: ${userId}`);

    // Convert userId to integer
    const id = parseInt(userId, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid userId format' });
    }

    // Delete related data for user
    await Progress.deleteByUserId(id); // Delete all progress records for the user
    await Workout.deleteByUserId(id);  // Delete all workout records for the user
    await MealPlan.deleteByUserId(id); // Delete all meal plan records for the user

    // Now delete the user itself
    const result = await User.deleteUser(id);

    // Check if the user was deleted successfully
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User and associated data deleted successfully' });
  } catch (error) {
    console.error('Error during user deletion:', error);
    res.status(500).json({ error: error.message || 'An unexpected error occurred' });
  }
});

router.delete('/', async (req, res) => {
  try {
    await Progress.deleteAll();  
    await Workout.deleteAll();  
    await MealPlan.deleteAll();  

    const result = await User.deleteAll();  

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'No users found to delete' });
    }

    res.status(200).json({ message: 'All users and related records deleted successfully' });
  } catch (error) {
    console.error('Error during deleting all users and related records:', error);
    res.status(500).json({ error: error.message || 'An unexpected error occurred' });
  }
});


module.exports = router;

