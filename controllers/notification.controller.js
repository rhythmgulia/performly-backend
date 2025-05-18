const Notification = require("../db/models/notification");

class NotificationController {
    static async createNotification(req, res) {
        try {
            const { userId, message, type } = req.body;
            const notification = new Notification({
                userId,
                message,
                type,
                read: false
            });
            await notification.save();
            res.status(201).json(notification);
        } catch (error) {
            res.status(500).json({ message: "Failed to create notification", error: error.message });
        }
    }

    static async getNotificationsByUser(req, res) {
        try {
            // Only allow users to view their own notifications
            const notifications = await Notification.find({ userId: req.user.userId })
                .sort({ createdAt: -1 })
                .limit(50);
            
            const unreadCount = await Notification.countDocuments({
                userId: req.user.userId,
                read: false
            });

            res.status(200).json({
                notifications,
                unreadCount
            });
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch notifications", error: error.message });
        }
    }

    static async markAsRead(req, res) {
        try {
            const notification = await Notification.findOne({
                _id: req.params.id,
                userId: req.user.userId
            });

            if (!notification) {
                return res.status(404).json({ message: "Notification not found" });
            }

            notification.read = true;
            await notification.save();

            res.status(200).json(notification);
        } catch (error) {
            res.status(500).json({ message: "Failed to mark as read", error: error.message });
        }
    }

    static async markAllAsRead(req, res) {
        try {
            await Notification.updateMany(
                { userId: req.user.userId, read: false },
                { read: true }
            );

            res.status(200).json({ message: "All notifications marked as read" });
        } catch (error) {
            res.status(500).json({ message: "Failed to mark all as read", error: error.message });
        }
    }

    static async deleteNotification(req, res) {
        try {
            const notification = await Notification.findOneAndDelete({
                _id: req.params.id,
                userId: req.user.userId
            });

            if (!notification) {
                return res.status(404).json({ message: "Notification not found" });
            }

            res.status(200).json({ message: "Notification deleted" });
        } catch (error) {
            res.status(500).json({ message: "Failed to delete notification", error: error.message });
        }
    }
}

module.exports = NotificationController;
