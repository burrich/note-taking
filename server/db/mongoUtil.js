const mongoose = require('mongoose');

const LOG_TAG = '[INFO]';

const url = process.env.MONGODB_URI;

/*
 * Connect to mongodb db (async) and set db object.
 */
exports.connect = function(callback) {
  if (url === undefined) throw new Error('process.env.MONGODB_URI undefined');

  mongoose.connect(url);

  const db = mongoose.connection;
  
  db.on('error', console.error.bind(console, 'connection error:')); // ???
  db.once('open', () => {
    console.log(LOG_TAG, 'Connected successfully to MongoDB server via mongoose');
    callback(null);
  });
};
