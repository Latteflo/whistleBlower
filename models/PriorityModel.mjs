import { pool } from "../config/db.mjs";

// Function to initialize priorities
export const initializePriorities = async () => {
  const priorities = [
    { name: "High", colorCode: "red" },
    { name: "Medium", colorCode: "orange" },
    { name: "Low", colorCode: "yellow" },
  ]

  try {
    for (const priority of priorities) {
      const query =
        "INSERT INTO priority (name, color_code) VALUES ($1, $2) ON CONFLICT (name) DO NOTHING"
      const values = [priority.name, priority.colorCode]
      await pool.query(query, values)
    }
  } catch (err) {
    throw err
  }
}

// Function to retrieve all priorities
export const getAllPriorities = async () => {
  const query = "SELECT * FROM priority"
  try {
    const result = await pool.query(query)
    return result.rows
  } catch (err) {
    throw err
  }
}
