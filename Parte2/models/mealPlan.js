const db = require('./db');

const Mealplan = {
  create: async (userId, date, calories, protein, carbs, fats) => {
    const query = `
      INSERT INTO meal_plans (user_id, date, calories, protein, carbs, fats)
      VALUES (?, ?, ?, ?, ?, ?)`;
    const [result] = await db.execute(query, [userId, date, calories, protein, carbs, fats]);
    return result;
  },

  getAll: async (userId) => {
    const query = `
      SELECT * FROM meal_plans
      WHERE user_id = ?
      ORDER BY date DESC`;
    const [rows] = await db.execute(query, [userId]);
    return rows;
  },

  getLatest: async (userId) => {
    const query = `
      SELECT * FROM meal_plans
      WHERE user_id = ?
      ORDER BY date DESC
      LIMIT 1`;
    const [rows] = await db.execute(query, [userId]);
    return rows[0];
  },

  updateById: async (id, calories, protein, carbs, fats) => {
    const query = `
      UPDATE meal_plans
      SET calories = ?, protein = ?, carbs = ?, fats = ?
      WHERE id = ?`;
    const [result] = await db.execute(query, [calories, protein, carbs, fats, id]);
    return result;
  },

  deleteByUserId: async (userId) => {
    const query = `
      DELETE FROM meal_plans
      WHERE user_id = ?`;
    const [result] = await db.execute(query, [userId]);
    return result;
  },

  deleteByMealPlanId: async (id) => {
    const query = `
      DELETE FROM meal_plans
      WHERE id = ?`;
    const [result] = await db.execute(query, [id]);
    return result;
  },
  deleteAll: async () => {
    const query = 'DELETE FROM meal_plans';
    const [result] = await db.execute(query);
    return result;
  },
};


module.exports = Mealplan;
