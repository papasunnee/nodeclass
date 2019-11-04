const fs = require("fs");
const path = require("path");
const rootDir = require("../util/rootDir");
const Cart = require("./cart");

const p = path.join(rootDir, "data", "products.json");

const getDataFromFile = callback => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return callback([]);
    }
    return callback(JSON.parse(fileContent));
  });
};
module.exports = class Product {
  constructor({ id, title, price, description, imageURL }) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageURL = imageURL;
  }
  save() {
    getDataFromFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          prod => prod.id == this.id
        );
        const updatedProducts = [...products];
        const existingProduct = updatedProducts[existingProductIndex];
        if (existingProduct) {
          // console.log("this", this);
          updatedProducts[existingProductIndex] = this;
          fs.writeFile(p, JSON.stringify(updatedProducts), err => {
            if (!err) {
              console.log("Product Updated Successfully");
            } else {
              console.log(err);
            }
          });
        }
      } else {
        this.id = Math.random();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }
  static fetchAll(callback) {
    getDataFromFile(callback);
  }

  static findById(id, callback) {
    getDataFromFile(products => {
      const product = products.find(p => p.id == id);
      callback(product);
    });
  }

  static deleteById(id, callback) {
    getDataFromFile(products => {
      const product = products.find(p => p.id == id);
      if (product) {
        const updatedProducts = products.filter(prod => prod.id != id);
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          if (err) {
            console.log(err);
            callback(err);
          } else {
            Cart.deleteProduct(id, product.price);
            callback("Product Deleted Successfully");
          }
        });
      }
    });
  }
};
