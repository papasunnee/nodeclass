const mongodb = require("mongodb");
const { getDb } = require("../util/database");

const ObjectId = mongodb.ObjectID;

module.exports = class User {
  constructor({ username, email, cart, password, id }) {
    this.username = username;
    this.email = email;
    this.password = password;
    this._id = id;
    this.cart = cart; // {items : [{productId : 121, quantity : 1}]}
  }
  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  addToCart(productId) {
    const db = getDb();
    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId == productId;
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(productId),
        quantity: newQuantity
      });
    }

    const updatedCart = {
      items: updatedCartItems
    };
    const dbOp = db.collection("users").updateOne(
      { _id: new ObjectId(this._id) },
      {
        $set: { cart: updatedCart }
      }
    );
    return dbOp
      .then(result => {
        return result;
      })
      .catch(err => {
        return err;
      });
  }

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map(ids => {
      return ids.productId;
    });

    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then(products => {
        return products.map(p => {
          return {
            ...p,
            quantity: this.cart.items.find(i => {
              return i.productId.toString() == p._id.toString();
            }).quantity
          };
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
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
