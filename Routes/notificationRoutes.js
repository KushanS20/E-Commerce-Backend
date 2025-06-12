const express = require('express');
const router = express.Router();
const controller = require('../Controllers/notificationController');

router.post('/', controller.createNotification);
router.get('/:userId', controller.getUserNotifications);
router.delete('/:id', controller.deleteNotification);

module.exports = router;
