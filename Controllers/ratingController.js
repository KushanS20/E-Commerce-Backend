const db = require("../config/db");

exports.addRating = async (req, res) => {
    const user_id = req.user.id;
    const { product_id, rating_value, comment } = req.body;

    try {
        await db.query(
            `INSERT INTO ratings (product_id, user_id, rating_value, comment) VALUES (?, ?, ?, ?)`,
            [product_id, user_id, rating_value, comment]
        );

        res.json({ message: "Rating added" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getRatingsForProduct = async (req, res) => {
    const product_id = req.params.product_id;

    try {
        const [rows] = await db.query(
            `SELECT r.rating_value, r.comment, u.name FROM ratings r JOIN user u ON r.user_id = u.id WHERE r.product_id = ?`,
            [product_id]
        );

        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
