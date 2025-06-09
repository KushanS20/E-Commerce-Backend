const db = require("../config/db");

exports.create = async (req, res) => {
    const { name, description, image_url, price, available_qty, ratings, tags, seller } = req.body;
    try {
        await db.query(
            `INSERT INTO product (name, description, image_url, price, available_qty, ratings, tags, seller)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, description, image_url, price, available_qty, ratings, tags, seller]
        );
        res.json({ message: "Product added successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { name, description, image_url, price, available_qty, ratings, tags, seller } = req.body;
    try {
        const [result] = await db.query(
            `UPDATE product SET name=?, description=?, image_url=?, price=?, available_qty=?, ratings=?, tags=?, seller=?
       WHERE id=?`,
            [name, description, image_url, price, available_qty, ratings, tags, seller, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: "Product not found" });
        res.json({ message: "Product updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const [result] = await db.query("DELETE FROM product WHERE id = ?", [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: "Product not found" });
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM product");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM product WHERE id = ?", [req.params.id]);
        if (!rows.length) return res.status(404).json({ error: "Product not found" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.search = async (req, res) => {
    const { keyword } = req.body;
    try {
        const [rows] = await db.query(
            "SELECT * FROM product WHERE name LIKE ? OR description LIKE ?",
            [`%${keyword}%`, `%${keyword}%`]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTop = async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM product ORDER BY ratings DESC LIMIT 10"
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getSimilar = async (req, res) => {
    try {
        const [original] = await db.query("SELECT tags FROM product WHERE id = ?", [req.params.id]);
        if (!original.length) return res.status(404).json({ error: "Product not found" });

        const tag = original[0].tags.split(",")[0];
        const [similar] = await db.query(
            "SELECT * FROM product WHERE tags LIKE ? AND id != ?",
            [`%${tag}%`, req.params.id]
        );
        res.json(similar);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
