const express = require("express");
const router = express.Router();
const path = require("path");
const { product } = require("../shop");

router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "..", "views", "add-product.html"));
});

router.post("/add-product", (req, res, next) => {
  console.log(product);
  product.push({ title: req.body.title });
  res.redirect("/");
});

module.exports = router;
