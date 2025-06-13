const express = require('express');
const router = express.Router();
const { getSpicesProducts } = require('../Controllers/spicesController');


router.get('/', getSpicesProducts);

module.exports = router;
