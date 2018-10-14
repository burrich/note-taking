const express = require('express');
const note    = require('../db/models/note');

/*
 * Router for notes CRUD
 * TODO: error handling => check body and path attr
 * TODO: next needed ?
 */
const router = express.Router();

const LOG_TAG = '[API/NOTES]';

// Find all
router.get('/', (req, res, next) => {
  note.findAll((err, notes) => {
    if (err) return next(err);

    // Check if user is user is authenticated (to remove)
    // console.log(LOG_TAG, 'req.user', req.user);

    console.log(LOG_TAG, 'READ :', JSON.stringify(notes, null, 2));
    res.json(notes);
  });
});

// Find one
router.get('/:noteId', (req, res, next) => {
  const noteId = req.params.noteId; 

  note.find(noteId, (err, result) => {
    if (err) return next(err);

    console.log(LOG_TAG, 'READ :', JSON.stringify(result, null, 2));
    res.json(result);
  });
});

// Insert
router.post('/', (req, res, next) => {
  const jsonNote = req.body;
  // TODO: use lodash lib to check empty object
  if (Object.keys(jsonNote).length === 0) {
    const err = new Error('Invalid body content');
    return next(err);
  }

  note.insert(jsonNote, (err, result) => {
    if (err) return next(err);

    console.log(LOG_TAG, 'CREATE :', JSON.stringify(result, null, 2));
    const results = { ...result.result, insertedId: result.insertedId };
    res.json(results);
  });
});

// Update
router.patch('/:noteId', (req, res, next) => {
  const noteId = req.params.noteId;
  const noteAttr = req.body;

  note.update(noteId, noteAttr, (err, result) => {
    if (err) return next(err);

    console.log(LOG_TAG, 'UPDATE :', JSON.stringify(result.result, null, 2));
    res.json(result);
  });
});

// Delete
router.delete('/:noteId', (req, res, next) => {
  const noteId = req.params.noteId;

  note.delete(noteId, (err, result) => {
    if (err) return next(err);

    console.log(LOG_TAG, 'DELETE :', JSON.stringify(result.result, null, 2));
    res.json(result);
  });
});

module.exports = router;
