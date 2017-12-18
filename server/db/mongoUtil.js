const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/noteTakingDB';

let database = null;

/**
 * Connect to mongodb db (async) and set db object.
 */
exports.connect = function(callback) {
  MongoClient.connect(url, (err, db) => {
    if (err) {
      return callback(err);
    }
    
    console.log("Connected successfully to MongoDB server");
    database = db;
    callback(null);
  });
};

exports.getDb = function() {
  return database;
}
