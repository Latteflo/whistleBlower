import { pool } from "../config/db.mjs"

// Function to search reports based on a query
export const searchReportsModel = async (query) => {
  try {
    const sql = `
      SELECT * FROM reports
      WHERE title ILIKE $1
      OR description ILIKE $1
      ORDER BY submitted_at DESC
    `
    const values = [`%${query}%`] // % is a wildcard character
    const result = await pool.query(sql, values)
    return result.rows
  } catch (error) {
    console.error(error)
    throw new Error("An error occurred while searching reports.")
  }
}

// Function to search categories based on a query
export const searchCategoriesModel = async (query) => {
  try {
    const sql = `
      SELECT * FROM categories
      WHERE name ILIKE $1
      ORDER BY name
    `

    const values = [`%${query}%`]

    const result = await pool.query(sql, values)
    return result.rows
  } catch (error) {
    console.error(error)
    throw new Error("An error occurred while searching categories.")
  }
}
