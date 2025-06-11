const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkoutController");
const auth = require("../middleware/auth");

router.post("/initiate", auth, checkoutController.initiate);
router.post("/confirm", auth, checkoutController.confirm);

module.exports = router;
