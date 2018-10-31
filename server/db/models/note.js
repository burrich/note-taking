const mongoose = require('mongoose');

/**
 * Define Note model.
 */

// Note schema with option typeKey in order to add a non mongoose type key
const noteSchema = new mongoose.Schema({
  name: String,
  entityMap: Object,
  blocks: [{
    key: String,
    text: String,
    type: String,
    depth: Number,
    inlineStyleRanges: Array,
    entityRanges: Array,
    data: Object
  }]
}, { typeKey: '$type' } );

module.exports = mongoose.model('Note', noteSchema);