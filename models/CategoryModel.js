const { pool } = require("../config/db")

// Function to create a category
const createCategory = async (name) => {
  const query = "INSERT INTO categories (name) VALUES ($1) RETURNING *"
  const values = [name]

  try {
    const result = await pool.query(query, values)
    return result.rows[0]
  } catch (err) {
    throw err
  }
}

// Function to retrieve all categories
const getAllCategories = async () => {
  const query = "SELECT * FROM categories"
  try {
    const result = await pool.query(query)
    return result.rows
  } catch (err) {
    throw err
  }
}

exports.createCategory = createCategory
exports.getAllCategories = getAllCategories
