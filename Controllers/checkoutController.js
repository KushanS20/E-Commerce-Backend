const db = require("../config/db");

exports.initiate = async (req, res) => {
    const user_id = req.user.id;

    try {
        const [cartItems] = await db.query(
            `SELECT c.quantity, p.price 
       FROM cart c 
       JOIN product p ON c.product_id = p.id 
       WHERE c.user_id = ?`,
            [user_id]
        );

        if (cartItems.length === 0) {
            return res.status(400).json({ error: "Cart is empty" });
        }

        const amount = cartItems.reduce((total, item) => {
            return total + item.quantity * item.price;
        }, 0);

        // Return amount for frontend payment gateway (like Stripe)
        res.json({ message: "Order initialized", amount });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.confirm = async (req, res) => {
    const user_id = req.user.id;
    const { amount, payment_status } = req.body;

    try {
        await db.query(
            `INSERT INTO \`order\` (user_id, amount, payment_status) VALUES (?, ?, ?)`,
            [user_id, amount, payment_status || "paid"]
        );

        await db.query(`DELETE FROM cart WHERE user_id = ?`, [user_id]);

        res.json({ message: "Order confirmed and cart cleared" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
