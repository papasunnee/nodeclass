const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const URI = "mongodb://localhost:27017/nodeclass";

let _db;

const mongoConnect = callback => {
  MongoClient.connect(URI, (err, client) => {
    if (err) throw new Error("Error:" + err);
    _db = client.db();
    console.log("Database Connected");
    callback(client);
  });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database Found";
};

module.exports = { mongoConnect, getDb };
// exports.mongoConnect = mongoConnect;
// exports.getDb = getDb;
