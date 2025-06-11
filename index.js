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
// app.use("/api/v1/products",require("./Routes/productRoutes"));
// app.use("/api/v1/cart", require("./Routes/cartRoutes"));
// app.use("/api/v1/checkout", require("./Routes/checkoutRoutes"));
// app.use("/api/v1/ratings", require("./Routes/ratingRoutes"));
// app.use("/api/v1/notifications", require("./Routes/notificationRoutes"));
// app.use('/api/v1/otp', require('./Routes/otpRoutes'));
// app.get("/api/v1/auth/profile", authMiddleware, require("./Controllers/authController").profile);


// const errorHandler = require("./Middleware/errorHandler")
// app.use(errorHandler())

module.exports = app;
