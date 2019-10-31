const express = require("express");
const router = express.Router();

const shopController = require("../../controllers/shop");

router.get("/", shopController.getIndex);
router.get("/product-list", shopController.getProducts);
router.get("/product-details/:productId", shopController.getProduct);
router.get("/cart", shopController.getCart);
router.post("/cart", shopController.postCart);
router.get("/checkout", shopController.getCheckout);

module.exports.router = router;
