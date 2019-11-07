const mongodb = require("mongodb");
const { getDb } = require("../util/database");

const ObjectId = mongodb.ObjectID;

module.exports = class User {
  constructor({ username, email, cart, password, id }) {
    this.username = username;
    this.email = email;
    this.password = password;
    this._id = id;
    this.cart = cart; // {items : []}
  }
  save() {
    const db = getDb();
    const dbOp = db
      .collection("users")
      .insertOne(this)
      .then(user => {
        console.log(user);
        return user;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
    return dbOp;
  }

  addToCart(product) {}
  static findById(userId) {
    const db = getDb();
    const dbOp = db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then(user => {
        // console.log(user);
        return user;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
    return dbOp;
  }
};
