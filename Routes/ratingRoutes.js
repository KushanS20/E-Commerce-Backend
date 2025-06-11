const express = require("express");
const router = express.Router();
const ratingController = require("../Controllers/ratingController");
const auth = require("../Middleware/authMiddleware");

router.get('/products/:productId', ratingController.getRatingsByProduct);
router.post('/products/:productId', auth,ratingController.createRating);
router.delete('/products/:productIds',auth, ratingController.deleteRatingsByProduct);


module.exports = router;
