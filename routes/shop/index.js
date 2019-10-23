const express = require("express");
const router = express.Router();

const shopController = require("../../controllers/shop");

router.get("/", shopController.getIndex);
router.get("/product-list", shopController.getProduct);
router.get("/cart", shopController.getCart);
router.get("/checkout", shopController.getProduct);

module.exports.router = router;
