import { pool } from '../config/db.mjs';

// Function to search reports based on a query
export const searchReports = async (query) => {
  try {
    const sql = `
      SELECT * FROM reports
      WHERE title ILIKE $1
      OR description ILIKE $1
      ORDER BY submitted_at DESC
    `;

    // Adding wildcards to the query for partial matching
    const values = [`%${query}%`];

    const result = await db.query(sql, values);
    return result.rows;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while searching reports.');
  }
};

// Function to search categories based on a query
export const searchCategories = async (query) => {
  try {
    const sql = `
      SELECT * FROM categories
      WHERE name ILIKE $1
      ORDER BY name
    `;

    // Adding wildcards to the query for partial matching
    const values = [`%${query}%`];

    const result = await db.query(sql, values);
    return result.rows;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while searching categories.');
  }
};
