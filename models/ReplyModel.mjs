import { pool } from "../config/db.mjs"

// Function to create a reply
export const createReplyModel = async (reportId, req, text) => {
  
  if(!req.user) {
    throw new Error('req.user is undefined');
  }

  // This is the ID from user_auth, which is used for authentication
  const authId = req.user.id;

  const fetchQuery = `
    SELECT ur.id 
    FROM user_role AS ur
    WHERE ur.auth_id = $1;
  `;

  try {
    const fetchResult = await pool.query(fetchQuery, [authId]);
    const userIdFromUserRole = fetchResult.rows[0]?.id;

    if (!userIdFromUserRole) {
      console.error("User ID is not present in user_role table");
      throw new Error("User ID is not present in user_role table");
    }

    const insertQuery = "INSERT INTO replies (report_id, user_id, text, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *";
    const values = [reportId, userIdFromUserRole, text];

    const insertResult = await pool.query(insertQuery, values);
    return insertResult.rows[0];

  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};


// Function to retrieve replies associated with a particular report ID
export const getRepliesByReportIdModel = async (reportId) => {
  const query = `
    SELECT 
      replies.id, 
      replies.report_id, 
      replies.user_id, 
      replies.text, 
      replies.created_at, 
      user_auth.username,
      user_role.role
    FROM 
      replies
    JOIN 
      user_role ON replies.user_id = user_role.id
    JOIN
      user_auth ON user_role.auth_id = user_auth.id
    WHERE 
      replies.report_id = $1;
  `;

  try {
    const result = await pool.query(query, [reportId]);
    return result.rows;
  } catch (err) {
    console.error("Error in fetching replies by report ID:", err);
    throw err;
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
