const pushNotificationController = require("../Controllers/pushNotifications")

const express = require("express")
const router = express.Router()

router.get("/all", pushNotificationController.sendNotification)
router.post("/device", pushNotificationController.sendNotificationToDevice)


module.exports = router
