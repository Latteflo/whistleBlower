const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser } = require('../models/UserModel');

router.post('/register', async (req, res) => {
  // Registration logic
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await createUser(req.body.username, hashedPassword);
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  res.json({ token });
});

router.post('/login', async (req, res) => {
  // Login logic
});

module.exports = router;
