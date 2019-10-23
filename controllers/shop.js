const Product = require("../models/products");

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/"
    });
  });
};

exports.getProduct = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/product-list"
    });
  });
};

exports.getCart = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("shop/cart", {
      pageTitle: "Cart",
      path: "/cart"
    });
  });
};
