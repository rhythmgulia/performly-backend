const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification.controller");


router.post("/", notificationController.createNotification);


router.get("/:userId", notificationController.getNotificationsByUser);


router.put("/read/:id", notificationController.markAsRead);


router.delete("/:id", notificationController.deleteNotification);

module.exports = router;
