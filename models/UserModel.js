const { pool } = require("../config/db")

// Function to create a user
const createUser = async (username, email, password, role = "client") => {
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
const getUserById = async (userId) => {
    console.log('Fetching user with ID:', userId); // Log the user ID
  
    const query =
    "SELECT ua.*, ur.role FROM user_auth AS ua JOIN user_role AS ur ON ua.id = ur.auth_id WHERE ur.auth_id = $1";
  
    try {
      const result = await pool.query(query, [userId]);
      console.log('User fetched:', result.rows[0]); // Log the user fetched
      return result.rows[0];
    } catch (err) {
      console.error('Error fetching user:', err); // Log any errors
      throw err;
    }
  };
  

// Function to update a user
const updateUser = async (userId, username, email, password) => {
  const query =
    "UPDATE user_auth SET username = $1, email = $2, password = $3 WHERE id = (SELECT auth_id FROM user_role WHERE id = $4) RETURNING *"
  const values = [username, email, password, userId]

  try {
    const result = await pool.query(query, values)
    return result.rows[0]
  } catch (err) {
    throw err
  }
}

// Function to delete a user
const deleteUser = async (userId) => {
  const query =
    "DELETE FROM user_auth WHERE id = (SELECT auth_id FROM user_role WHERE id = $1) RETURNING *"

  try {
    const result = await pool.query(query, [userId])
    return result.rows[0]
  } catch (err) {
    throw err
  }
}

// Function to change a user's role
const changeUserRole = async (userId, role) => {
  const query = "UPDATE user_role SET role = $1 WHERE id = $2 RETURNING *"
  const values = [role, userId]

  try {
    const result = await pool.query(query, values)
    return result.rows[0]
  } catch (err) {
    throw err
  }
}

// Function to retrieve a user by username (including the password, for authentication)
const getUserByUsername = async (username) => {
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
const getAllUsers = async () => {
  const query =
    "SELECT ua.*, ur.role FROM user_auth AS ua JOIN user_role AS ur ON ua.id = ur.auth_id"
  try {
    const result = await pool.query(query)
    return result.rows
  } catch (err) {
    throw err
  }
}



exports.createUser = createUser
exports.getUserById = getUserById
exports.updateUser = updateUser
exports.deleteUser = deleteUser
exports.changeUserRole = changeUserRole
exports.getUserByUsername = getUserByUsername
exports.getAllUsers = getAllUsers
