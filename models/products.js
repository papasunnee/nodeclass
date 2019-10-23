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
  constructor(t) {
    this.title = t;
  }
  save() {
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
};
