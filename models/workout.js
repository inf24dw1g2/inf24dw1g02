const db = require('./db');

const Workout = {
  create: async (userId, type, exercise, sets, reps, weight) => {
    const query = 'INSERT INTO workouts (user_id, type, exercise, sets, reps, weight) VALUES (?, ?, ?, ?, ?, ?)';
    return db.execute(query, [userId, type, exercise, sets, reps, weight]);
  },

  getAll: async (userId) => {
    const query = 'SELECT * FROM workouts WHERE user_id = ? ';
    const [rows] = await db.execute(query, [userId]);
    return rows;
  },

  getById: async (id) => {
    const query = 'SELECT * FROM workouts WHERE id = ?';
    const [rows] = await db.execute(query, [id]);
    return rows[0];
  },

  update: async (id, type, exercise, sets, reps, weight) => {
    const query = 'UPDATE workouts SET type = ?, exercise = ?, sets = ?, reps = ?, weight = ? WHERE id = ?';
    const [result] = await db.execute(query, [type, exercise, sets, reps, weight, id]);
    return result;
  },

  delete: async (id) => {
    const query = 'DELETE FROM workouts WHERE id = ?';
    const [result] = await db.execute(query, [id]);
    return result;
  },

  deleteByUserId: async (userId) => {
    const query = 'DELETE FROM workouts WHERE user_id = ?';
    const [result] = await db.execute(query, [userId]);
    return result;
  },
  deleteAll: async () => {
    const query = 'DELETE FROM workouts';
    const [result] = await db.execute(query);
    return result;
  },
};


module.exports = Workout;
