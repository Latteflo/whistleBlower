import { pool } from "../config/db.mjs"

// Function to create a reply
export const createReplyModel = async (reportId, userId, text) => {
  const query =
    "INSERT INTO replies (report_id, user_id, text, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *"
  const values = [reportId, userId, text]
  try {
    const result = await pool.query(query, values)
    return result.rows[0]
  } catch (err) {
    console.error("Error in creating reply:", err)
    throw err
  }
}

// Function to retrieve replies associated with a particular report ID
export const getRepliesByReportIdModel = async (reportId) => {
  const query = "SELECT * FROM replies WHERE report_id = $1"
  try {
    const result = await pool.query(query, [reportId])
    return result.rows
  } catch (err) {
    console.error("Error in fetching replies by report ID:", err)
    throw err
  }
}

// Function to update the text of a reply
export const updateReplyModel = async (replyId, text) => {
  const query = "UPDATE replies SET text = $1 WHERE id = $2 RETURNING *"
  const values = [text, replyId]
  try {
    const result = await pool.query(query, values)
    return result.rows[0]
  } catch (err) {
    console.error("Error in updating reply:", err)
    throw err
  }
}

// Function to delete a reply
export const deleteReplyModel = async (replyId) => {
  const query = "DELETE FROM replies WHERE id = $1 RETURNING *"
  try {
    const result = await pool.query(query, [replyId])
    return result.rows[0]
  } catch (err) {
    console.error("Error in deleting reply:", err)
    throw err
  }
}
