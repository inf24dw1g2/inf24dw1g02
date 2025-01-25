const express = require('express');
const Mealplan = require('../models/mealPlan');
const router = express.Router();

router.post('/', async (req, res) => {
  const { userId, date, calories, protein, carbs, fats } = req.body;

  if (!userId || !date || !calories || !protein || !carbs || !fats) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const result = await Mealplan.create(userId, date, calories, protein, carbs, fats);
    res.status(201).json({ message: 'Meal plan created', data: result });
  } catch (err) {
    res.status(500).json({ error: err.message || err });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const result = await Mealplan.getAll(req.params.userId);
    if (result.length === 0) {
      return res.status(404).json({ error: 'No meal plans found for this user' });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message || err });
  }
});

router.get('/latest/:userId', async (req, res) => {
  try {
    const result = await Mealplan.getLatest(req.params.userId);
    if (!result) {
      return res.status(404).json({ error: 'No meal plans found for this user' });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message || err });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { calories, protein, carbs, fats } = req.body;

  if (!calories || !protein || !carbs || !fats) {
    return res.status(400).json({ error: 'All fields are required to update the meal plan' });
  }

  try {
    const result = await Mealplan.updateById(id, calories, protein, carbs, fats);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Meal plan record not found or no changes made' });
    }
    res.json({ message: 'Meal plan updated successfully', result });
  } catch (error) {
    res.status(500).json({ error: error.message || 'An error occurred while updating meal plan' });
  }
});

router.delete('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await Mealplan.deleteByUserId(userId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'No meal plans found for this user' });
    }
    res.status(200).json({ message: 'All meal plans deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
});

router.delete('/meal_plans/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Mealplan.deleteByMealPlanId(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Meal plan record not found' });
    }
    res.status(200).json({ message: 'Meal plan record deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
});

module.exports = router;
