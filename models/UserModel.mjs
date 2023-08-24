import { pool } from "../config/db.mjs";

// Function to create a user
export const createUser = async (username, email, password, role = "client") => {
  await pool.query("BEGIN")

  try {
    const userAuthQuery =
      "INSERT INTO user_auth (username, email, password) VALUES ($1, $2, $3) RETURNING id"
    const userAuthValues = [username, email, password]
    const userAuthResult = await pool.query(userAuthQuery, userAuthValues)
    const authId = userAuthResult.rows[0].id

    const userRoleQuery =
      "INSERT INTO user_role (auth_id, role) VALUES ($1, $2) RETURNING *"
    const userRoleValues = [authId, role]
    const userRoleResult = await pool.query(userRoleQuery, userRoleValues)

    await pool.query("COMMIT")
    return userRoleResult.rows[0]
  } catch (err) {
    await pool.query("ROLLBACK")
    throw err
  }
}

// Function to retrieve a user by ID
export const getUserById = async (userId) => {
  const query =
    "SELECT ua.*, ur.role FROM user_auth AS ua JOIN user_role AS ur ON ua.id = ur.auth_id WHERE ur.auth_id = $1"

  try {
    const result = await pool.query(query, [userId])
    return result.rows[0]
  } catch (err) {
    throw err
  }
}

// Function to retrieve a user by username (including the password, for authentication)
export const getUserByUsername = async (username) => {
  const query =
    "SELECT ua.*, ur.role FROM user_auth AS ua JOIN user_role AS ur ON ua.id = ur.auth_id WHERE ua.username = $1"
  try {
    const result = await pool.query(query, [username])
    return result.rows[0]
  } catch (err) {
    throw err
  }
}

// Function to retrieve all users (joining user_auth and user_role)
export const getAllUsers = async () => {
  const query =
    "SELECT ua.*, ur.role FROM user_auth AS ua JOIN user_role AS ur ON ua.id = ur.auth_id"
  try {
    const result = await pool.query(query)
    return result.rows
  } catch (err) {
    throw err
  }
}