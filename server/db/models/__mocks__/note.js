exports.findAll = function(callback) {
  const notes = [
    { name: 'note 1'},
    { name: 'note 2'}
  ];
  callback(null, notes);
}

exports.find = function(id, callback) {
  callback(null, { name: 'note 1'});
};

exports.insert = function(note, callback) {
  callback(null, { result: 'ok' });
};

exports.update = function(id, attr, callback) {
  callback(null, { result: 'ok' });
};

exports.delete = function(id, callback) {
  callback(null, { result: 'ok' });
};