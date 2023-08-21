const { pool } = require('../db');


const createUser = async (username, password) => {
    const query = "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *";
    const values = [username, password];
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  };

  
  exports.createUser = createUser;