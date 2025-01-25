const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'your_database'
});

const create = (name, age, height, weight, goal) => {
  return new Promise((resolve, reject) => {
    if (!name || !age || !height || !weight || !goal) {
      return reject('All fields are required and cannot be undefined');
    }

    const query = 'INSERT INTO users (name, age, height, weight, goal) VALUES (?, ?, ?, ?, ?)';
    const values = [name, age, height, weight, goal];

    connection.execute(query, values, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

const getById = (userId) => {
  return new Promise((resolve, reject) => {
    if (!userId || isNaN(userId)) {
      return reject('Invalid userId');
    }

    const query = 'SELECT * FROM users WHERE id = ?';
    const values = [userId];

    connection.execute(query, values, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

const getAll = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users';

    connection.execute(query, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

const update = (userId, name, age, height, weight, goal) => {
  return new Promise((resolve, reject) => {
    if (!userId || isNaN(userId)) {
      return reject('Invalid userId');
    }

    const query = 'UPDATE users SET name = ?, age = ?, height = ?, weight = ?, goal = ? WHERE id = ?';
    const values = [name, age, height, weight, goal, userId];

    connection.execute(query, values, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

const deleteUser = (userId) => {
  return new Promise((resolve, reject) => {
    if (!userId || isNaN(userId)) {
      return reject('Invalid userId');
    }

    const query = 'DELETE FROM users WHERE id = ?';
    const values = [userId];

    connection.execute(query, values, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

const deleteAll = () => {
  return new Promise((resolve, reject) => {
    const deleteQuery = 'DELETE FROM users';

    connection.execute(deleteQuery, (err, results) => {
      if (err) {
        return reject(err);
      }

      const resetAutoIncrementQuery = 'ALTER TABLE users AUTO_INCREMENT = 1';
      connection.execute(resetAutoIncrementQuery, (err, resetResults) => {
        if (err) {
          return reject(err);
        }

        resolve({ affectedRows: results.affectedRows });
      });
    });
  });
};

module.exports = { create, getById, getAll, update, deleteUser, deleteAll };
