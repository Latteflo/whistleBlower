import { pool } from "../config/db.mjs";

// Function to create an audit log
export const createAuditLog = async (userId, reportId, action) => {
  const query =
    "INSERT INTO audit_logs (user_id, report_id, action, timestamp) VALUES ($1, $2, $3, NOW()) RETURNING *"
  const values = [userId, reportId, action]

  try {
    const result = await pool.query(query, values)
    return result.rows[0]
  } catch (err) {
    throw err
  }
}

// Function to retrieve audit logs by report ID
export const getAuditLogsByReportId = async (reportId) => {
  const query = "SELECT * FROM audit_logs WHERE report_id = $1"
  try {
    const result = await pool.query(query, [reportId])
    return result.rows
  } catch (err) {
    throw err
  }
}
