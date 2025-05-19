const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/notification.controller');
const auth = require('../middleware/auth');
const { notificationValidationRules, validate } = require('../middleware/validators');

router.get('/', auth, NotificationController.getNotificationsByUser);
router.post('/', auth, notificationValidationRules(), validate, NotificationController.createNotification);
router.put('/:id/read', auth, NotificationController.markAsRead);
router.put('/mark-all-read', auth, NotificationController.markAllAsRead);
router.delete('/:id', auth, NotificationController.deleteNotification);

module.exports = router;