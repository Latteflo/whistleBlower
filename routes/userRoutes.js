const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authMiddleware, authMiddlewareWithRole } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       200:
 *         description: User registered successfully
 */
router.post('/register', UserController.register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: User logged in successfully
 */
router.post('/login', UserController.login);

/**
 * @swagger
 * /register-admin:
 *   post:
 *     summary: Register a new admin (accessible only to admins)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminRegistration'
 *     responses:
 *       200:
 *         description: Admin registered successfully
 */
router.post('/register-admin', authMiddlewareWithRole('admin'), UserController.registerAdmin);

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get user profile (protected)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 */
router.get('/profile', authMiddleware, UserController.profile);

// Export the router
module.exports = router;    
