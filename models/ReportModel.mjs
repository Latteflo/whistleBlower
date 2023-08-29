import { pool } from "../config/db.mjs"

// Function to create a report
export const createReport = async (
  userId,
  categoryId,
  priorityId,
  title,
  description,
  media,
  isAnonymous,
  involveOthers,
  status
) => {
  // Validate data types
  if (typeof userId !== 'number' || typeof categoryId !== 'number' || typeof priorityId !== 'number') {
    throw new Error('Invalid data types for IDs');
  }

  // SQL query for inserting a new report
  const query = `
    INSERT INTO reports(
      user_id, 
      category_id, 
      priority_id, 
      title, 
      description, 
      media, 
      is_anonymous, 
      involve_others, 
      status
    )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *; 
  `;

  // Values to insert into the report table
  const values = [
    userId,
    categoryId,
    priorityId,
    title,
    description,
    media,
    isAnonymous,
    involveOthers,
    status,
  ];

  try {
    console.log('Executing query:', query); // Debug log
    console.log('With values:', values); // Debug log
    console.log('Data types:', values.map(value => typeof value)); // Debug log

    // Execute the SQL query
    const result = await pool.query(query, values);

    // Return the inserted report
    return result.rows[0];
  } catch (err) {
    console.error('Error executing query', { query, values, err });
    throw err;
  }
};

// Function to retrieve all reports
export const getAllReports = async () => {
  const query = "SELECT * FROM reports"
  try {
    const result = await pool.query(query)
    return result.rows
  } catch (err) {
    console.error("Error in fetching reports:", err)
    return []
  }
}

// Function to retrieve a report by ID
export const getReportById = async (reportId) => {
  const query = "SELECT * FROM reports WHERE id = $1"
  try {
    const result = await pool.query(query, [reportId])
    return result.rows[0]
  } catch (err) {
    console.error("Error in fetching reports:", err)
    return []
  }
}

// Function to update a report
export const updateReport = async (reportId, title, description, status) => {
  const query =
    "UPDATE reports SET title = $1, description = $2, status = $3, updated_at = NOW() WHERE id = $4 RETURNING *"
  const values = [title, description, status, reportId]

  try {
    const result = await pool.query(query, values)
    return result.rows[0]
  } catch (err) {
    console.error("Error in fetching reports:", err)
    return []
  }
}

// Function to delete a report
export const deleteReport = async (reportId) => {
  const query = "DELETE FROM reports WHERE id = $1 RETURNING *"

  try {
    const result = await pool.query(query, [reportId])
    return result.rows[0]
  } catch (err) {
    console.error("Error in fetching reports:", err)
    return []
  }
}

// Function to retrieve all reports by color
export const getReportsByPriorityColor = async (color) => {
  const query =
    "SELECT r.*, c.name AS category, p.name AS priority FROM reports AS r JOIN categories AS c ON r.category_id = c.id JOIN priorities AS p ON r.priority_id = p.id WHERE p.color = $1"
  try {
    const result = await pool.query(query, [color])
    return result.rows
  } catch (err) {
    console.error("Error in fetching reports:", err)
    return []
  }
}
// Function to retrieve reports by user ID
export const getReportsByUserId = async (userId) => {
  try {
    // Query to fetch all reports for a specific user by user ID
    const query = "SELECT * FROM reports WHERE user_id = $1"
    const values = [userId]
    const result = await pool.query(query, values)
    return result.rows
  } catch (error) {
    console.error("Error fetching reports for user:", error)
    throw error
  }
}

// Function to update a report status
export const updateReportStatus = async (req, res) => {
  try {
    // Extract report ID and new status from request
    const { id } = req.params
    const { status } = req.body

    // Call the corresponding model function to update the report status in the database
    const updatedReport = await updateReportStatus(id, status)

    // Send a successful response with the updated report
    res.json({ success: true, report: updatedReport })
  } catch (error) {
    // Handle any errors that occurred during the update
    console.error("Error updating report status:", error)
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the report status",
    })
  }
}
