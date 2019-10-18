const express = require("express");
const path = require("path");

const router = express.Router();
const product = [];

router.get("/", (req, res, next) => {
  console.log(product);
  res.sendFile(path.join(__dirname, "..", "..", "views", "shop.html"), {
    product: product
  });
});

module.exports.router = router;
module.exports.product = product;
