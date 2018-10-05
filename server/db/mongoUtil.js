const MongoClient = require('mongodb').MongoClient;

const url = process.env.MONGODB_URI;
let database = null;

/*
 * Connect to mongodb db (async) and set db object.
 */
exports.connect = function(callback) {
  if (url === undefined) throw new Error('process.env.MONGODB_URI undefined');

  MongoClient.connect(url, (err, db) => {
    if (err) return callback(err);
    
    console.log("Connected successfully to MongoDB server");
    database = db;
    callback(null);
  });
};

exports.getDb = function() {
  return database;
}
