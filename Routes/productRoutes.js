const express = require('express');
const router = express.Router();
const productController = require('../Controllers/productController');
const upload = require('../Middleware/upload');

router.get('/', productController.getAllProducts);
// router.post('/', productController.createProduct);
router.post(
    '/',
    upload.array('images', 5),
    productController.createProduct
);


module.exports = router;
