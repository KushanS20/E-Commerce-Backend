const express = require('express');
const router = express.Router();
const { getHandcraftProducts } = require('../Controllers/handcraftController');


router.get('/', getHandcraftProducts);

module.exports = router;
