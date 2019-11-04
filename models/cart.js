const fs = require("fs");
const path = require("path");
const Product = require("./products");

const rootDir = require("../util/rootDir");

const p = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, productPrice) {
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
      console.log({ id });
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      });
      // Product.findById(id, product => {
      //   if (product) {
      //     cart.totalPrice = cart.totalPrice + +product.price;
      //     fs.writeFile(p, JSON.stringify(cart), err => {
      //       console.log(err);
      //     });
      //   }
      // });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        clg({ sda: "err", err });
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find(prod => prod.id == id);
      if (!product) {
        clg({ sda2: "err", err });
        return;
      }
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(prod => prod.id != id);
      updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;

      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        console.log(err);
      });
    });
  }

  static getCart(callback) {
    fs.readFile(p, (err, fileContent) => {
      if (!err) {
        const cart = JSON.parse(fileContent);
        return callback(cart);
      }
      return callback(null);
    });
  }
};
