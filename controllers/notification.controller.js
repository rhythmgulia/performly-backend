const Notification = require("../db/models/notification");

exports.createNotification = async (req, res) => {
    try {
        const { userId, message } = req.body;
        const notification = new Notification({ userId, message });
        await notification.save();
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ error: "Failed to create notification" });
    }
};


exports.getNotificationsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch notifications" });
    }
};


exports.markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
        if (!notification) {
            return res.status(404).json({ error: "Notification not found" });
        }
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ error: "Failed to mark as read" });
    }
};


exports.deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Notification.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ error: "Notification not found" });
        }
        res.status(200).json({ message: "Notification deleted" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete notification" });
    }
};
