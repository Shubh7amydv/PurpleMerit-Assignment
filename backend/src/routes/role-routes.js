const express = require('express');
const router = express.Router();

const { roleController } = require('../controllers/index');
const { authenticate } = require('../middleware/index');

// All routes require authentication
router.use(authenticate);

router.get('/', roleController.getAllRoles);

module.exports = router;
