import { pool } from "../config/db.mjs";

// Function to create a category
export const createCategoryModel = async (name) => {
  const query = "INSERT INTO categories (name) VALUES ($1) RETURNING *"
  const values = [name]

  try {
    const result = await pool.query(query, values)
    return result.rows[0]
  } catch (err) {
    console.error('Error in fetching categories:', err);
    return [];
  }
  
}

// Function to retrieve all categories
export const getAllCategoriesModel = async () => {
  const query = "SELECT * FROM categories"
  try {
    const result = await pool.query(query)
    return result.rows
  } catch (err) {
    console.error('Error in fetching categories:', err);
    return [];
  }
  
}

// Function to retrieve a category by ID
export const getCategoryByIdModel  = async (categoryId) => {
  const query = "SELECT * FROM categories WHERE id = $1"
  const values = [categoryId]

  try {
    const result = await pool.query(query, values)
    return result.rows[0]
  }catch (err) {
    console.error('Error in fetching categories:', err);
    return [];
  }
}

// Function to retrieve reports by category ID
export const getReportsByCategoryIdModel = async (categoryId) => {
  const query = "SELECT * FROM reports WHERE category_id = $1"
  const values = [categoryId]

  try {
    const result = await pool.query(query, values)
    return result.rows
  } catch (err) {
    console.error('Error in fetching categories:', err);
    return [];
  }
}

// Function to update a category

export const updateCategoryModel = async (categoryId, name) => {
  const query = "UPDATE categories SET name = $1 WHERE id = $2 RETURNING *"
  const values = [name, categoryId]

  try {
    const result = await pool.query(query, values)
    return result.rows[0]
  } catch (err) {
    console.error('Error in fetching categories:', err);
    return [];
  }
}

// Function to delete a category

export const deleteCategoryModel = async (categoryId) => {
  if (!categoryId) {
    logError('Delete Category', 'Category ID is missing');
    return null;
  }

  const query = "DELETE FROM categories WHERE id = $1 RETURNING *";
  const values = [categoryId];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    logError('Delete Category', err);
    return null;
  }
};