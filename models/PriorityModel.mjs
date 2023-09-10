import { pool } from "../config/db.mjs"

// Function to initialize priorities
export const initializePrioritiesModel = async () => {
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
    return true
  } catch (err) {
    console.error("Error in initializing priorities:", err)
    throw new Error("Failed to initialize priorities")
  }
}

// Function to retrieve all priorities
export const getAllPrioritiesModel = async () => {
  const query = "SELECT * FROM priority"
  try {
    const result = await pool.query(query)
    return result.rows
  } catch (err) {
    console.error("Error in fetching priorities:", err)
    throw new Error("Failed to fetch priorities")
  }
}

// Function to retrieve all reports by color
export const getReportsByPriorityColorModel = async (color) => {
  const query = `
    SELECT r.*, c.name AS category, p.name AS priority 
    FROM reports AS r 
    JOIN categories AS c ON r.category_id = c.id 
    JOIN priorities AS p ON r.priority_id = p.id 
    WHERE p.color = $1
  `
  try {
    const result = await pool.query(query, [color])
    return result.rows
  } catch (err) {
    console.error("Error in fetching reports by priority color:", err)
    throw new Error("Failed to fetch reports by priority color")
  }
}

// Function to retrieve reports by priority ID
export const getReportsByPriorityIdModel = async (priorityId) => {
  const query = "SELECT * FROM reports WHERE priority_id = $1"
  try {
    const result = await pool.query(query, [priorityId])
    return result.rows
  } catch (err) {
    console.error("Error in fetching reports by priority ID:", err)
    throw new Error("Failed to fetch reports by priority ID")
  }
}


// Function to retrieve priority by ID
export const getPriorityByIdModel = async (id) => {
  try {
    const query = 'SELECT * FROM priority WHERE id = $1';
    const values = [id];
    
    const result = await db.query(query, values);
    
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching priority by ID:', error);
    return null;
  }
};