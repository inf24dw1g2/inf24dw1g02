import React, { useState } from 'react';
import axios from 'axios';

const MealPlanForm = () => {
  const [mealPlan, setMealPlan] = useState({
    userId: '',
    date: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numberFields = ["userId", "calories", "protein", "carbs", "fats"];

    // Convert to number if it's one of the number fields, and leave others as they are
    setMealPlan((prevState) => ({
      ...prevState,
      [name]: numberFields.includes(name) && value !== "" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure that we send only valid values
    const formattedMealPlan = {
      ...mealPlan,
      userId: Number(mealPlan.userId) || 0,  // Ensure it's a number, fallback to 0 if invalid
      date: mealPlan.date,  // Ensure it's in "YYYY-MM-DD" format (validate this format as needed)
      calories: Number(mealPlan.calories) || 0,
      protein: Number(mealPlan.protein) || 0,
      carbs: Number(mealPlan.carbs) || 0,
      fats: Number(mealPlan.fats) || 0,
    };

    console.log("Submitting meal plan:", formattedMealPlan); // Check the submitted data

    try {
      const response = await axios.post('http://localhost:3001/mealplan', formattedMealPlan, {
        headers: { "Content-Type": "application/json" },
      });
      alert('Meal Plan Submitted!');
      console.log("Server response:", response.data);
    } catch (error) {
      console.error('Error submitting meal plan:', error.response ? error.response.data : error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        User ID:
        <input type="number" name="userId" value={mealPlan.userId} onChange={handleChange} required />
      </label>
      <label>
        Date:
        <input type="date" name="date" value={mealPlan.date} onChange={handleChange} required />
      </label>
      <label>
        Calories:
        <input type="number" name="calories" value={mealPlan.calories} onChange={handleChange} required />
      </label>
      <label>
        Protein:
        <input type="number" name="protein" value={mealPlan.protein} onChange={handleChange} required />
      </label>
      <label>
        Carbs:
        <input type="number" name="carbs" value={mealPlan.carbs} onChange={handleChange} required />
      </label>
      <label>
        Fats:
        <input type="number" name="fats" value={mealPlan.fats} onChange={handleChange} required />
      </label>
      <button type="submit">Submit Meal Plan</button>
    </form>
  );
};

export default MealPlanForm;
