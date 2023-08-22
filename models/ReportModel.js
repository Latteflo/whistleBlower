const { pool } = require("../config/db")

// Function to create a report
const createReport = async (
  userId,
  categoryId,
  priorityId,
  title,
  description,
  isAnonymous,
  involveOthers,
  status
) => {
  const query =
    "INSERT INTO reports (user_id, category_id, priority_id, title, description, is_anonymous, involve_others, status, submitted_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) RETURNING *"
  const values = [
    userId,
    categoryId,
    priorityId,
    title,
    description,
    isAnonymous,
    involveOthers,
    status,
  ]

  try {
    const result = await pool.query(query, values)
    return result.rows[0]
  } catch (err) {
    throw err
  }
}

// Function to retrieve a report by ID
const getReportById = async (reportId) => {
  const query = "SELECT * FROM reports WHERE id = $1"
  try {
    const result = await pool.query(query, [reportId])
    return result.rows[0]
  } catch (err) {
    throw err
  }
}

// Function to update a report
const updateReport = async (reportId, title, description, status) => {
  const query =
    "UPDATE reports SET title = $1, description = $2, status = $3, updated_at = NOW() WHERE id = $4 RETURNING *"
  const values = [title, description, status, reportId]

  try {
    const result = await pool.query(query, values)
    return result.rows[0]
  } catch (err) {
    throw err
  }
}

// Function to delete a report
const deleteReport = async (reportId) => {
  const query = "DELETE FROM reports WHERE id = $1 RETURNING *"

  try {
    const result = await pool.query(query, [reportId])
    return result.rows[0]
  } catch (err) {
    throw err
  }
}

exports.createReport = createReport
exports.getReportById = getReportById
exports.updateReport = updateReport
exports.deleteReport = deleteReport
