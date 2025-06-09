const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const authMiddleware = require("./Middleware/auth");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth",require("./routes/auth"));
app.get("/api/auth/profile", authMiddleware, require("./controllers/authController").profile);
app.use("/api/products",require("./routes/product"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/checkout", require("./routes/checkout"));
app.use("/api/ratings", require("./routes/rating"));
app.use("/api/notifications", require("./routes/notifications"));

module.exports = app;
