const express = require('express');
const router = express.Router();
const { getFoodAndBevsProducts } = require('../Controllers/foodAndBevController');


router.get('/', getFoodAndBevsProducts);

module.exports = router;
