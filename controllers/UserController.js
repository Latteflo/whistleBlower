const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  createUser,
  getUserByUsername,
  getUserById
} = require('../models/UserModel');


// Function to register a user
exports.register = async (req, res) => {
    try {
      const { username, email, password, role } = req.body;
  
      // Validate role if provided
      if (role && !['admin', 'client'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the user with the specified or default role
      const user = await createUser(username, email, hashedPassword, role || 'client');
  
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
// Function to register an admin
  exports.registerAdmin = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the user with the admin role
      const user = await createUser(username, email, hashedPassword, 'admin');
  
      res.status(201).json({ message: 'Admin registered successfully', user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  


exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Check the password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Generate a JWT
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.profile = async (req, res) => {
  try {
    // Retrieve and return user profile
    const user = await getUserById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
