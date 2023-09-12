import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Joi from "joi"
import {
  createUserModel,
  getUserByIdModel,
  getUserByUsernameModel,
  getAllUsersModel,
  getUserByEmailModel,
  updateUserPasswordModel,
  getAllAdminsModel,
} from "../models/UserModel.mjs"

// Define the Joi schema for the request body data
const schema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().valid("admin", "client"),
})

// Function to register a user
export const register = async (req, res) => {
  try {
    const { error, value } = schema.validate(req.body)
    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }
    const { username, email, password, role } = value

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
    const { error, value } = schema.validate(req.body)
    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }
    const { username, email, password } = value

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
    const user =
      (await getUserByUsernameModel(username)) ||
      (await getUserByEmailModel(username))

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

// Function to update user password
export const updateUserPassword = async (req, res) => {
  try {
    const userId = req.user.id
    const { oldPassword, newPassword } = req.body

    // Fetch the current password hash from the database for this user
    const user = await getUserByIdModel(userId)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Check if the old password is correct
    const isMatch = await bcrypt.compare(oldPassword, user.password)

    if (!isMatch) {
      return res.status(401).json({ message: "Old password is incorrect" })
    }

    // Update the password
    const updateSuccess = await updateUserPasswordModel(userId, newPassword)

    if (updateSuccess) {
      res.status(200).json({ message: "Password updated successfully" })
    } else {
      res.status(500).json({ message: "Failed to update password" })
    }
  } catch (error) {
    console.error("Error while updating password:", error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

// Function to get all admins

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await getAllAdminsModel()
    res.json(admins)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
