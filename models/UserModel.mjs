import { pool } from "../config/db.mjs";
import bcrypt from 'bcrypt';

// Function to create a user
export const createUserModel = async (username, email, password, role = "client") => {
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  await pool.query("BEGIN");
  try {
    const userAuthQuery = "INSERT INTO user_auth (username, email, password) VALUES ($1, $2, $3) RETURNING id";
    const userAuthValues = [username, email, hashedPassword];
    const userAuthResult = await pool.query(userAuthQuery, userAuthValues);
    const authId = userAuthResult.rows[0].id;

    const userRoleQuery = "INSERT INTO user_role (auth_id, role) VALUES ($1, $2) RETURNING *";
    const userRoleValues = [authId, role];
    const userRoleResult = await pool.query(userRoleQuery, userRoleValues);

    await pool.query("COMMIT");
    return userRoleResult.rows[0];
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error("Error while creating user:", err);
    throw err;
  }
};

// Function to retrieve a user by ID
export const getUserByIdModel = async (userId) => {
  const query = "SELECT ua.*, ur.role FROM user_auth AS ua JOIN user_role AS ur ON ua.id = ur.auth_id WHERE ur.auth_id = $1";
  try {
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  } catch (err) {
    console.error("Error while fetching user by ID:", err);
    throw err;
  }
};

// Function to retrieve a user by username
export const getUserByUsernameModel = async (username) => {
  const query = "SELECT ua.*, ur.role FROM user_auth AS ua JOIN user_role AS ur ON ua.id = ur.auth_id WHERE ua.username = $1";
  try {
    const result = await pool.query(query, [username]);
    return result.rows[0];
  } catch (err) {
    console.error("Error while fetching user by username:", err);
    throw err;
  }
};

// Function to retrieve a user by email
export const getUserByEmailModel = async (email) => {
  const query = "SELECT ua.*, ur.role FROM user_auth AS ua JOIN user_role AS ur ON ua.id = ur.auth_id WHERE ua.email = $1";
  try {
    const result = await pool.query(query, [email]);
    return result.rows[0];
  } catch (err) {
    console.error("Error while fetching user by email:", err);
    throw err;
  }
};

// Function to retrieve all users
export const getAllUsersModel = async () => {
  const query = "SELECT ua.*, ur.role FROM user_auth AS ua JOIN user_role AS ur ON ua.id = ur.auth_id";
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.error("Error while fetching all users:", err);
    throw err;
  }
};

// Function to update a user's password
export const updateUserPasswordModel = async (userId, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const query = "UPDATE user_auth SET password = $1 WHERE id = $2 RETURNING id";
  const values = [hashedPassword, userId];

  try {
    const result = await pool.query(query, values);
    return result.rows[0]?.id ? true : false;
  } catch (err) {
    console.error('Error in updating user password:', err);
    return false;
  }
};

// Function to get all admins 
export const getAllAdminsModel = async () => {
  const query = "SELECT ua.*, ur.role FROM user_auth AS ua JOIN user_role AS ur ON ua.id = ur.auth_id WHERE ur.role = 'admin'";

  try {
    const result = await pool.query(query);
    return result.rows;
  }
  catch (err) {
    console.error("Error while fetching all admins:", err);
    throw err;
  }
}

// Function to logout a user
export const logoutUserModel = async (userId) => {
  const query = "UPDATE user_auth SET token = NULL WHERE id = $1 RETURNING id";
  const values = [userId];

  try {
    const result = await pool.query(query, values);

    return result.rows[0]?.id ? true : false;
  } catch (err) {
    console.error('Error in updating user token:', err);
    return false;
  }
};

