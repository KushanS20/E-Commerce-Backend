const express = require('express');
const router = express.Router();
const protect = require('../Middleware/authMiddleware');
const profileController = require("../Controllers/userController");

router.get("/", protect, profileController.getSignedUserDetails)
router.put("/", protect, profileController.updateSignedUserProfile)
router.put("/password", protect, profileController.changePassword)

module.exports = router;
