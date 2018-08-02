const MongoClient = require('mongodb').MongoClient;

let url;
let database = null;

if (process.env.MONGODB_URI) {
  url = process.env.MONGODB_URI;
} else {
  url = 'mongodb://localhost:27017/noteTakingTestDB';
}

/*
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
