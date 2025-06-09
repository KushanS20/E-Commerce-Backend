const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");


router.post("/", productController.create);
router.put("/:id", productController.update);
router.delete("/:id", productController.remove);
router.get("/", productController.getAll);
router.post("/search", productController.search);
router.get("/top", productController.getTop);
router.get("/similar/:id", productController.getSimilar);
router.get("/:id", productController.getById);

module.exports = router;
