const express = require("express");

const router = express.Router();

router.get("/add-product", (req, res, next) => {
  console.log();
  res.send(`<form action='product' method='post'>
    <input type="text" required name="title" />
    <button>Submit</button>
    </form>`);
});

router.post("/product", (req, res, next) => {
  if (req.body.title) {
    res.send(`<h1>New Book ${req.body.title} Added</h1>`);
  } else {
    res.send("Book Page");
  }
});

module.exports = router;
