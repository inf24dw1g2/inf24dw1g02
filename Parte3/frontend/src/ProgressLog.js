import React, { useState } from 'react';
import axios from 'axios';

const ProgressForm = () => {
  const [progress, setProgress] = useState({
    userId: '',
    date: '',
    weight: '',
    chest: '',
    arms: '',
    legs: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numberFields = ["userId", "weight", "chest", "arms", "legs"];
    
    setProgress((prevState) => ({
      ...prevState,
      [name]: numberFields.includes(name) ? Number(value) || 0 : value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting progress:", progress);
    
    try {
      await axios.post('http://localhost:3001/progress', progress, {
        headers: { "Content-Type": "application/json" },
      });
      alert('Progress Submitted!');
    } catch (error) {
      console.error('Error submitting progress:', error.response ? error.response.data : error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        User ID:
        <input type="number" name="userId" value={progress.userId} onChange={handleChange} required />
      </label>
      <label>
        Date:
        <input type="date" name="date" value={progress.date} onChange={handleChange} required />
      </label>
      <label>
        Weight:
        <input type="number" name="weight" value={progress.weight} onChange={handleChange} required />
      </label>
      <label>
        Chest:
        <input type="number" name="chest" value={progress.chest} onChange={handleChange} required />
      </label>
      <label>
        Arms:
        <input type="number" name="arms" value={progress.arms} onChange={handleChange} required />
      </label>
      <label>
        Legs:
        <input type="number" name="legs" value={progress.legs} onChange={handleChange} required />
      </label>
      <button type="submit">Submit Progress</button>
    </form>
  );
};

export default ProgressForm;
