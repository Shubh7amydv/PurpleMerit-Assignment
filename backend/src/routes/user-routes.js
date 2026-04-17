const express = require('express');
const router = express.Router();

const { userController } = require('../controllers/index');
const { authenticate, authorize } = require('../middleware/index');

// Protected routes - All require authentication
router.use(authenticate);

// User's own profile routes
router.get('/profile', userController.getOwnProfile);
router.patch('/profile', userController.updateOwnProfile);

// Admin and Manager routes - Get all users and manage users
router.get('/', authorize('ADMIN', 'MANAGER'), userController.getAllUsers);
router.post('/', authorize('ADMIN'), userController.createUser);

// Admin routes - Individual user management
router.get('/:id', authorize('ADMIN', 'MANAGER'), userController.getUser);
router.put('/:id', authorize('ADMIN'), userController.updateUser);
router.delete('/:id', authorize('ADMIN'), userController.deleteUser);
router.patch('/:id/deactivate', authorize('ADMIN'), userController.deactivateUser);
router.patch('/:id/activate', authorize('ADMIN'), userController.activateUser);

module.exports = router;
