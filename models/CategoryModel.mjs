import { pool } from "../config/db.mjs";

// Function to create a category
export const createCategory = async (name) => {
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
export const getAllCategories = async () => {
  const query = "SELECT * FROM categories"
  try {
    const result = await pool.query(query)
    return result.rows
  } catch (err) {
    throw err
  }
}

// Function to retrieve a category by ID
export const getReportsByCategoryId = async (categoryId) => {
  const query = "SELECT * FROM categories WHERE id = $1"
  const values = [categoryId]

  try {
    const result = await pool.query(query, values)
    return result.rows[0]
  } catch (err) {
    throw err
  }
}
