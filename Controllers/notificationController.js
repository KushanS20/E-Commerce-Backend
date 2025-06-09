const db = require("../config/db");

exports.create = async (req, res) => {
    const { description, user_id } = req.body;
    try {
        await db.query(
            "INSERT INTO notification (description, user_id) VALUES (?, ?)",
            [description, user_id]
        );
        res.json({ message: "Notification sent" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserNotifications = async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM notification WHERE user_id = ? ORDER BY created_at DESC",
            [req.user.id]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
