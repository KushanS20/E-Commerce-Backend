const express = require('express');
const router = express.Router();
const { getClothingProducts } = require('../Controllers/clothingController');


router.get('/', getClothingProducts);

module.exports = router;
