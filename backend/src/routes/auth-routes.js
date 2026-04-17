const express = require('express');
const router = express.Router();

const { authController } = require('../controllers/index');
const { authenticate, authorize } = require('../middleware/index');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
router.get('/me', authenticate, authController.getCurrentUser);

module.exports = router;
