const express = require('express');
const router = express.Router();

const authRoutes = require('./auth-routes');
const userRoutes = require('./user-routes');
const roleRoutes = require('./role-routes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/roles', roleRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
