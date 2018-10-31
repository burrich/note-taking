const express = require('express');
const _ = require('lodash');

const Note = require('../db/models/Note');

const LOG_TAG = '[API/NOTES]';

/*
* Router for notes CRUD
* TODO: error handling => check body and path attr
*/

const router = express.Router();

// Find all
router.get('/', (req, res, next) => {
  Note.find(function(err, notes) {
    if (err) return next(err);

    console.log(LOG_TAG, 'READ :', JSON.stringify(notes, null, 2));
    res.json(notes);
  });
});

// Find one
router.get('/:noteId', (req, res, next) => {
  const noteId = req.params.noteId; 

  Note.findById(noteId, (err, note) => {
    if (err) return next(err);

    console.log(LOG_TAG, 'READ :', JSON.stringify(note, null, 2));
    res.json(note);
  });
});

// Insert
router.post('/', (req, res, next) => {
  const bodyNote = req.body;

  // TODO: use lodash lib to check empty object
  if (Object.keys(bodyNote).length === 0) {
    const err = new Error('Invalid body content');
    return next(err);
  }

  const newNote = new Note(bodyNote);
  newNote.save(function(err, savedNote) {
    if (err) return next(err);

    console.log(LOG_TAG, 'CREATE :', JSON.stringify(savedNote, null, 2));
    res.json({
      ok: 1,
      insertedId: savedNote._id
    });
  });
});

// Update
router.patch('/:noteId', (req, res, next) => {
  const noteId = req.params.noteId;
  const noteAttr = req.body;

  Note.update({ _id: noteId }, noteAttr, function(err, result) {
    if (err) return next(err);

    console.log(LOG_TAG, 'UPDATE :', JSON.stringify(result, null, 2));
    res.json(_.pick(result, ['ok', 'nModified']));
  });
});

// Delete
router.delete('/:noteId', (req, res, next) => {
  const noteId = req.params.noteId;

  Note.deleteOne({ _id: noteId }, (err) => {
    if (err) return next(err);

    console.log(LOG_TAG, 'DELETE :', `note ${noteId}`);
    res.json({ ok: 1 });
  });
});

module.exports = router;
