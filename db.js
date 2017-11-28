const MongoClient = require('mongodb').MongoClient;
const assert      = require('assert');

const url = 'mongodb://localhost:27017/noteTakingDB';

/**
 * Connect to mongodb db (async) and get db object.
 * db launch : mongod --dbpath C:\MongoDB\data
 */
exports.connect = function(callback) {
  MongoClient.connect(url, (err, db) => {
    if (err) {
      return callback(err);
    }
    
    console.log("Connected successfully to MongoDB server");
    callback(null, db);
  });
};
