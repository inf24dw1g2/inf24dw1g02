const db = require('./db');

const Progress = {
  create: async (userId, date, weight, chest, arms, legs) => {
    if (!userId || !date || !weight || !chest || !arms || !legs) {
      throw new Error('All fields are required');
    }
    const query = 'INSERT INTO progress (user_id, date, weight, chest, arms, legs) VALUES (?, ?, ?, ?, ?, ?)';
    try {
      const [result] = await db.execute(query, [userId, date, weight, chest, arms, legs]);
      return result;
    } catch (error) {
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        throw new Error('User Not Found');
      }
      throw error;
    }
  },

  getAll: async (userId) => {
    const query = 'SELECT * FROM progress WHERE user_id = ? ORDER BY date DESC';
    const [rows] = await db.execute(query, [userId]);
    return rows;
  },

  getLatest: async (userId) => {
    const query = 'SELECT * FROM progress WHERE user_id = ? ORDER BY date DESC LIMIT 1';
    const [rows] = await db.execute(query, [userId]);
    return rows[0];
  },

  updateById: async (id, weight, chest, arms, legs) => {
    if (weight == null || chest == null || arms == null || legs == null) {
      throw new Error('All fields (weight, chest, arms, legs) are required');
    }

    const query = `
      UPDATE progress
      SET weight = ?, chest = ?, arms = ?, legs = ?
      WHERE id = ?
    `;
    try {
      const [result] = await db.execute(query, [weight, chest, arms, legs, id]);
      if (result.affectedRows === 0) {
        throw new Error('Progress record not found or no changes made');
      }
      return result;
    } catch (error) {
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        throw new Error('No user found with the provided user ID (foreign key violation)');
      }
      throw error;
    }
  },

  resetAutoIncrement: async () => {
    try {
      const query = 'ALTER TABLE progress AUTO_INCREMENT = 1;';
      await db.execute(query);
    } catch (error) {
      console.error("Error resetting auto-increment:", error.message);
      throw error;
    }
  },

  deleteByUserId: async (userId) => {
    const deleteQuery = 'DELETE FROM progress WHERE user_id = ?';
    const [deleteResult] = await db.execute(deleteQuery, [userId]);
    return deleteResult;
  },

  deleteByProgressId: async (progressId) => {
    const query = 'DELETE FROM progress WHERE id = ?';
    const [result] = await db.execute(query, [progressId]);
    return result;
  },
  deleteAll: async () => {
    const query = 'DELETE FROM progress';
    const [result] = await db.execute(query);
    return result;
  },
};


module.exports = Progress;
