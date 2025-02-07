import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WorkoutForm = () => {
  const [workout, setWorkout] = useState({
    userId: '',
    type: '',
    exercise: '',
    sets: '',
    reps: '',
    weight: '',
  });
  
  const [workouts, setWorkouts] = useState([]); // Store all workouts
  const [selectedWorkout, setSelectedWorkout] = useState(null); // Store selected workout for editing
  const [searchId, setSearchId] = useState(''); // State to store workout ID for search

  // Fetch all workouts when the component loads
  useEffect(() => {
    getWorkouts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numberFields = ['userId', 'sets', 'reps', 'weight'];
    
    setWorkout((prevState) => ({
      ...prevState,
      [name]: numberFields.includes(name) ? Number(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // If updating a workout
      if (selectedWorkout) {
        await axios.put(`http://localhost:3001/workout/${selectedWorkout.id}`, workout);
        alert('Workout Updated!');
      } else {
        // If adding a new workout
        await axios.post('http://localhost:3001/workout', workout);
        alert('Workout Submitted!');
      }

      getWorkouts(); // Refresh workout list after submission
      setSelectedWorkout(null); // Clear selected workout after update
    } catch (error) {
      console.error('Error submitting workout:', error.response ? error.response.data : error);
    }
  };

  const getWorkouts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/workout');
      setWorkouts(response.data); // Set fetched workouts into state
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  const handleDelete = async (workoutId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/workout/${workoutId}`);
      alert('Workout Deleted!');
      getWorkouts(); // Refresh list after deletion
    } catch (error) {
      console.error('Error deleting workout:', error.response ? error.response.data : error);
    }
  };

  const handleEdit = (workoutId) => {
    const selected = workouts.find((workout) => workout.id === workoutId);
    setSelectedWorkout(selected); // Set the selected workout for editing
    setWorkout(selected); // Pre-fill form with selected workout data
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3001/workout/${searchId}`);
      if (response.data) {
        setWorkouts([response.data]); // Set only the searched workout in state
      } else {
        alert('Workout not found!');
      }
    } catch (error) {
      console.error('Error fetching workout by ID:', error);
      alert('Error fetching workout!');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>{selectedWorkout ? 'Update Workout' : 'Submit New Workout'}</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>User ID:</label>
          <input
            type="number"
            name="userId"
            value={workout.userId}
            onChange={handleChange}
            required
            style={{ marginLeft: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Workout Type:</label>
          <input
            type="text"
            name="type"
            value={workout.type}
            onChange={handleChange}
            required
            style={{ marginLeft: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Exercise:</label>
          <input
            type="text"
            name="exercise"
            value={workout.exercise}
            onChange={handleChange}
            required
            style={{ marginLeft: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Sets:</label>
          <input
            type="number"
            name="sets"
            value={workout.sets}
            onChange={handleChange}
            required
            style={{ marginLeft: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Reps:</label>
          <input
            type="number"
            name="reps"
            value={workout.reps}
            onChange={handleChange}
            required
            style={{ marginLeft: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Weight:</label>
          <input
            type="number"
            name="weight"
            value={workout.weight}
            onChange={handleChange}
            required
            style={{ marginLeft: '10px' }}
          />
        </div>
        <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>
          {selectedWorkout ? 'Update Workout' : 'Submit Workout'}
        </button>
      </form>

      {/* Search Workouts */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Search Workout by ID:</h3>
        <form onSubmit={handleSearch}>
          <input
            type="number"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter workout ID"
            style={{ padding: '8px', marginRight: '10px' }}
          />
          <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#2196F3', color: 'white', border: 'none' }}>
            Search
          </button>
        </form>
      </div>

      {/* List Workouts */}
      <h3>Workouts:</h3>
      <ul>
        {workouts.length === 0 ? (
          <p>No workouts found.</p>
        ) : (
          workouts.map((workout) => (
            <li key={workout.id} style={{ marginBottom: '10px' }}>
              <strong>{workout.exercise}</strong> ({workout.sets} sets x {workout.reps} reps x {workout.weight}kg)
              <div>
                <button
                  onClick={() => handleEdit(workout.id)}
                  style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#FF9800', color: 'white', border: 'none' }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(workout.id)}
                  style={{ padding: '5px 10px', backgroundColor: '#F44336', color: 'white', border: 'none' }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default WorkoutForm;
