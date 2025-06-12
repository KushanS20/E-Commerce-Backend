const express = require("express");
const router = express.Router();
const { registerFcmToken } = require("../Controllers/fcmController");

router.post("/register", registerFcmToken);

module.exports = router;
