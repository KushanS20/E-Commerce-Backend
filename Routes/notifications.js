const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const auth = require("../middleware/auth");

router.post("/", auth, notificationController.create);
router.get("/", auth, notificationController.getUserNotifications);

module.exports = router;
