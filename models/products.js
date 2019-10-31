const fs = require("fs");
const path = require("path");
const rootDir = require("../util/rootDir");

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
  constructor({ title, price, description, imageURL }) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageURL = imageURL;
  }
  save() {
    this.id = Math.random();
    getDataFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
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
};
