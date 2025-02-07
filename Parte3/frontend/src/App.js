import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import WorkoutLog from "./WorkoutLog";
import NutritionLog from "./NutritionLog";
import ProgresssLog from "./ProgressLog";

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/workout-log">Workout Log</Link>
          <Link to="/nutrition-log">Nutrition Log</Link>
          <Link to="/progress-log">Progress Log</Link>

        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workout-log" element={<WorkoutLog />} />
          <Route path="/nutrition-log" element={<NutritionLog />} />
          <Route path="/progress-log" element={<ProgresssLog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
