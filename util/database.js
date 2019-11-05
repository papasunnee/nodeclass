const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const URI = "mongodb://localhost:27017/nodeclass";

const mongoConnect = callback => {
  MongoClient.connect(URI, (err, client) => {
    if (err) throw err;
    console.log("Database Connected");
    callback(client);
  });
};

module.exports = mongoConnect;
