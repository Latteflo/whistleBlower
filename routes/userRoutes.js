const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController'); 
const { authMiddleware } = require('../middleware/authMiddleware');
const { authMiddlewareWithRole } = require('../middleware/authMiddleware');

// Registration route
router.post('/register', UserController.register);

// Login route
router.post('/login', UserController.login);

// Admin registration route (accessible only to admins)
router.post('/register-admin', authMiddlewareWithRole('admin'), UserController.registerAdmin);

// Profile route (protected)
router.get('/profile', authMiddleware, UserController.profile);

// Export the router
module.exports = router;
