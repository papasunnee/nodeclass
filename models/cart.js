const fs = require("fs");
const path = require("path");
const Product = require("./products");

const rootDir = require("../util/rootDir");

const p = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
  static addProduct(id) {
    // fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // analyze the cart i.e find existing product
      const existingProductIndex = cart.products.findIndex(
        product => product.id == id
      );
      let updatedProduct;
      // add new product /  increase quantity
      if (existingProductIndex >= 0) {
        const existingProduct = cart.products[existingProductIndex];
        console.log(existingProduct);
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      Product.findById(id, product => {
        if (product) {
          cart.totalPrice = cart.totalPrice + +product.price;
          fs.writeFile(p, JSON.stringify(cart), err => {
            console.log(err);
          });
        }
      });
    });
  }
};
