const express = require('express');
const note    = require('../db/models/note');

/*
 * Router for notes CRUD
 * TODO: check body
 */
const router = express.Router();

router.get('/foo', (req, res, next) => {
  res.json({ foo: 'bar'});
});

// Find all
router.get('/', (req, res, next) => {
  note.findAll((err, notes) => {
    if (err) return next(err);

    console.log('READ :', JSON.stringify(notes, null, 2));
    res.json(notes);
  });
});

// Find one
router.get('/:noteId', (req, res, next) => {
  const noteId = req.params.noteId; 

  note.find(noteId, (err, result) => {
    if (err) return next(err);

    console.log('READ :', JSON.stringify(result, null, 2));
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

    console.log('CREATE', result.result);
    res.json(result);
  });
});

// Update
router.patch('/:noteId', (req, res, next) => {
  const noteId = req.params.noteId;
  const noteAttr = req.body;

  note.update(noteId, noteAttr, (err, result) => {
    if (err) return next(err);

    console.log('UPDATE :', result.result);
    res.json(result);
  });
});

// Delete
router.delete('/:noteId', (req, res, next) => {
  const noteId = req.params.noteId;

  note.delete(noteId, (err, result) => {
    if (err) return next(err);

    console.log('DELETE :', result.result);
    res.json(result);
  });
});

module.exports = router;
