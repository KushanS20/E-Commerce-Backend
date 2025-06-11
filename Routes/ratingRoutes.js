const express = require("express");
const router = express.Router();
const ratingsController = require("../controllers/ratingController");
const auth = require("../middleware/auth");

router.post("/", auth, ratingsController.addRating);
router.get("/:product_id", ratingsController.getRatingsForProduct);

module.exports = router;
