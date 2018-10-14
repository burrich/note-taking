const mongoUtil = require('../mongoUtil');
const ObjectId  = require('mongodb').ObjectId;

const db = mongoUtil.getDb();
const users = db.collection('users');

exports.find = function(username, callback) {
  users.findOne({ username: username }, (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

exports.findById = function(id, callback) {
  users.findOne({ _id: new ObjectId(id) }, (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

/**
 * Check password, for plain password first (WIP).
 * TODO: mamange hash password
 * TODO: refactore to a schema method (mongoose)
 */
exports.validPassword = function(password, user) {
  if (password !== user.password) {
    return false;
  } 
  return true;
}