const Sequelize = require('sequelize');
const initDB = require("./db-init");

const db = new Sequelize({
  dialect: 'mysql',
  host: 'mysql-fitness-tracker', 
  username: 'root',
  password: 'rootpassword', 
  database: 'fitness_tracker',
});

initDB(); 

db.authenticate()
  .then(() => {
    console.log('Database connected!');
  })
  .catch(err => {
    console.error('Error connecting to the database: ', err);
  });

const express = require('express');
const dotenv = require('dotenv');
const modelsdb = require('./models/db');
const workoutRoutes = require('./routes/workouts');
const progressRoutes = require('./routes/progress');
const userRoutes = require('./routes/users');
const mealPlanRoutes = require('./routes/mealPlan');

dotenv.config();
const app = express();

app.use(express.json());


app.use('/api/workouts', workoutRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/users', userRoutes);
app.use('/api/mealPlan', mealPlanRoutes);

db.authenticate()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Unable to connect to the database:', err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
