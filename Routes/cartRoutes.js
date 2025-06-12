const express = require('express');
const router = express.Router();
const cartController = require('../Controllers/cartController');
const protect = require('../Middleware/authMiddleware');

router.post('/', protect, cartController.addToCart);
router.get('/', protect, cartController.getCart);
router.delete('/:cartId', protect, cartController.removeFromCart);
router.delete('/', protect, cartController.clearCart);

module.exports = router;
