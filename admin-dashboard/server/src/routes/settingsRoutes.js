const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');

const authMiddleware = require('../middleware/authMiddleware');

router.get('/maintenance', settingsController.getMaintenanceMode);
router.post('/maintenance', authMiddleware, settingsController.toggleMaintenanceMode);

module.exports = router;
