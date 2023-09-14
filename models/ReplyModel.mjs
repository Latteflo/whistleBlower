import { pool } from "../config/db.mjs"

export const createReplyModel = async (reportId, req, text) => {
  const authId = req.user.id;

  // Fetching the user_id directly by joining user_auth and user_role tables
  const fetchQuery = `
    SELECT ur.id 
    FROM user_role AS ur
    INNER JOIN user_auth AS ua ON ur.auth_id = ua.id
    WHERE ua.id = $1;
  `;

  try {
    const fetchResult = await pool.query(fetchQuery, [authId]);
    const userId = fetchResult.rows[0]?.id;

    console.log('User ID:', userId);

    if (!userId) {
      console.error("User ID is null");
      throw new Error("User ID is null");
    }

    const insertQuery = "INSERT INTO replies (report_id, user_id, text, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *";
    const values = [reportId, userId, text];

    const insertResult = await pool.query(insertQuery, values);
    return insertResult.rows[0];

  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};



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
