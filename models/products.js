const mongodb = require("mongodb");
const { getDb } = require("../util/database");

module.exports = class Product {
  constructor({ title, price, description, imageURL, _id }) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageURL = imageURL;
    this._id = _id ? new mongodb.ObjectID(_id) : null;
  }

  save() {
    const db = getDb();
    let dbOp;
    // if _id is not null, we are updating a product
    if (this._id) {
      dbOp = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      // this._id is null, hence we are saving a new product
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }
  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then(products => {
        return products;
      })
      .catch(err => {
        return err;
      });
  }

  static findById(prodId) {
    const db = getDb();
    const dbOp = db
      .collection("products")
      .findOne({ _id: new mongodb.ObjectID(prodId) })
      .then(product => {
        return product;
      })
      .catch(e => clg(e));
    return dbOp;
  }
};
