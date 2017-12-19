const mongoUtil = require('../mongoUtil');
const ObjectId  = require('mongodb').ObjectId;

const db = mongoUtil.getDb();
const notes = db.collection('notes');

exports.findAll = function(callback) {
  notes.find().toArray((err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

exports.find = function(id, callback) {
  const objectId = new ObjectId(id);

  notes.findOne({ _id: objectId }, (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

exports.insert = function(note, callback) {
  notes.insertOne(note, (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

exports.update = function(id, attr, callback) {
  const objectId = new ObjectId(id);

  notes.updateOne({ _id: objectId }, { $set: attr }, (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

exports.delete = function(id, callback) {
  const objectId = new ObjectId(id);

  notes.deleteOne({ _id: objectId }, (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};
