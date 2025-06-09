const db = require("../config/db");

exports.getCart = async (req, res) => {
    try {
        const [cart] = await db.query(
            `SELECT c.id, p.name, p.price, c.quantity
       FROM cart c
       JOIN product p ON c.product_id = p.id
       WHERE c.user_id = ?`,
            [req.user.id]
        );
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addToCart = async (req, res) => {
    const { product_id, quantity } = req.body;
    const user_id = req.user.id;
    try {
        const [existing] = await db.query(
            "SELECT * FROM cart WHERE user_id = ? AND product_id = ?",
            [user_id, product_id]
        );

        if (existing.length > 0) {
            await db.query(
                "UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?",
                [quantity || 1, user_id, product_id]
            );
        } else {
            await db.query(
                "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)",
                [user_id, product_id, quantity || 1]
            );
        }

        res.json({ message: "Item added to cart" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.removeFromCart = async (req, res) => {
    const user_id = req.user.id;
    const product_id = req.params.productId;
    try {
        const [result] = await db.query(
            "DELETE FROM cart WHERE user_id = ? AND product_id = ?",
            [user_id, product_id]
        );
        if (result.affectedRows === 0)
            return res.status(404).json({ error: "Item not found in cart" });
        res.json({ message: "Item removed from cart" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
