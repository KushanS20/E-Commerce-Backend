const Notification = require('../Models/notification');
const UserFcmToken = require("../Models/userFcm");
const sendPushNotification = require('../fcm/sendPush');

exports.createNotification = async (req, res) => {
  try {
    const { userId, description } = req.body;

    if (!userId || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const fcmRecord = await UserFcmToken.findOne({ where: { userId } });

    if (!fcmRecord) {
      return res.status(404).json({ error: "FCM token not found for this user" });
    }

    const notification = await Notification.create({ userId, description });

    await sendPushNotification(
      fcmRecord.fcmToken,
      "📢 New Notification",
      description,
      { notificationId: notification.id }
    );

    res.status(201).json({ message: "Notification sent", notification });
  } catch (error) {
    console.error("Create notification error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUserNotifications = async (req, res) => {
    try {
        const { userId } = req.params;
        const notifications = await Notification.findAll({ where: { userId } });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


exports.deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Notification.destroy({ where: { id } });

        if (deleted) {
            return res.status(200).json({ message: "Notification deleted" });
        } else {
            return res.status(404).json({ error: "Notification not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.update({ isRead: true }, { where: { id } });
    res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
