const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
// const authMiddleware = require("./Middleware/auth");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth",require("./Routes/authRoutes"));
app.use('/api/v1/users', require('./Routes/userRoutes'));
app.use('/api/v1/otp', require('./Routes/otpRoutes'));
app.use('/api/v1/products', require('./Routes/productRoutes'));
app.use("/api/v1/ratings", require("./Routes/ratingRoutes"));
app.use("/api/v1/search", require("./Routes/searchProductRoutes"));
app.use("/api/v1/profile", require("./Routes/userRoutes"))
app.use("/api/v1/cart", require("./Routes/cartRoutes"))
app.use("/api/v1/users", require("./Routes/userDetailsByTokenRoutes"))
// app.use("/api/v1/notifications", require("./Routes/notificationRoutes"))
app.use("/api/v1/notifications", require("./Routes/app.routes"))
app.use("/api/v1/fcm", require("./Routes/fcmRoutes"));


app.use("/api/v1/products/handcrafts", require("./Routes/handcraftRoutes"))
app.use("/api/v1/products/herbals", require("./Routes/herbalRoutes"))

module.exports = app;
