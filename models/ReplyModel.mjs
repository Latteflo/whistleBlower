import { pool } from "../config/db.mjs";

// Function to create a reply
export const createReply = async (reportId, userId, text) => {
  const query =
    "INSERT INTO replies (report_id, user_id, text, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *"
  const values = [reportId, userId, text]

  try {
    const result = await pool.query(query, values)
    return result.rows[0]
  } catch (err) {
    throw err
  }
}

// Function to retrieve replies by report ID
export const getRepliesByReportId = async (reportId) => {
  const query = "SELECT * FROM replies WHERE report_id = $1"
  try {
    const result = await pool.query(query, [reportId])
    return result.rows
  } catch (err) {
    throw err
  }
}

// Function to update a reply
export const updateReply = async (replyId, text) => {
  const query = "UPDATE replies SET text = $1 WHERE id = $2 RETURNING *"
  const values = [text, replyId]

  try {
    const result = await pool.query(query, values)
    return result.rows[0]
  } catch (err) {
    throw err
  }
}

// Function to delete a reply
export const deleteReply = async (replyId) => {
  const query = "DELETE FROM replies WHERE id = $1 RETURNING *"

  try {
    const result = await pool.query(query, [replyId])
    return result.rows[0]
  } catch (err) {
    throw err
  }
}