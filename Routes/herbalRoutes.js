const express = require('express');
const router = express.Router();
const { getHerbalProducts } = require('../Controllers/herbalController');


router.get('/', getHerbalProducts);

module.exports = router;
