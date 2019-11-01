const Product = require("../models/products");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const productId = req.params.productId;
  Product.findById(productId, product => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/edit-product",
      product: product,
      editing: editMode
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, imageURL, price, description } = req.body;
  const updatedProduct = new Product({
    id: productId,
    title,
    imageURL,
    price,
    description
  });
  updatedProduct.save();
  res.redirect("/admin/products");
};

exports.postAddProduct = (req, res, next) => {
  const { title, price, imageURL, description } = req.body;
  const product = new Product({ title, price, imageURL, description });
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products"
    });
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  res.redirect("/admin/products");
};
