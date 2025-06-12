const UserFcmToken = require("../Models/userFcm");

exports.registerFcmToken = async (req, res) => {
  const { userId, fcmToken } = req.body;

  if (!userId || !fcmToken) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const [tokenRecord, created] = await UserFcmToken.upsert({ userId, fcmToken });
    res.status(200).json({ message: "FCM token registered/updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to register FCM token" });
  }
};
