import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {
  createUserModel,
  getUserByIdModel,
  getUserByUsernameModel,
  getAllUsersModel,
  getUserByEmailModel
} from "../models/UserModel.mjs"

// Function to register a user
export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body

    // Validate role if provided
    if (role && !["admin", "client"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create the user with the specified or default role
    const user = await createUserModel(
      username,
      email,
      hashedPassword,
      role || "client"
    )

    res.status(201).json({ message: "User registered successfully", user })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Function to register an admin
export const registerAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create the user with the admin role
    const user = await createUserModel(username, email, hashedPassword, "admin")

    res.status(201).json({ message: "Admin registered successfully", user })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Function to login a user or admin - works for both
export const login = async (req, res) => {
  try {
    const { username, password } = req.body

    // Find the user by username OR email
    const user = await getUserByUsernameModel(username) || await getUserByEmailModel(username)    

    // Check if the user exists
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" })
    }

    // Check the password
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid username or password" })
    }

    // Generate a JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    )

    res.json({ token, user })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Function to retrieve a user profile
export const profile = async (req, res) => {
  try {
    // Retrieve and return user profile
    const user = await getUserByIdModel(req.user.id)
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Function to retrieve all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersModel()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
