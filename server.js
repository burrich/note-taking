const express    = require('express');
const bodyParser = require('body-parser');
const connect    = require('./db').connect;
const ObjectId   = require('mongodb').ObjectId;

/*
 * Express server serving a restful api with mongodb.
 * TODO: check body
 * TODO: unit tests
 */

/*
 * Database connection
 */
let db;
connect((err, database) => {
  if (err) {
    // TODO: next(error)
    return console.error(err);
  }
  db = database;
});

/*
 * Router for notes CRUD
 * TODO: separate file (mongoose ?)
 */
const router = express.Router();

// Find all
router.get('/notes', (req, res, next) => {
  const notes = db.collection('notes');

  notes.find().toArray((err, results) => {
    if (err) return next(err);

    console.log('READ :', JSON.stringify(results, null, 2));
    res.json(results);
  });
});

// Find one
router.get('/notes/:noteId', (req, res, next) => {
  const objectId = new ObjectId(req.params.noteId);
  const notes = db.collection('notes');

  notes.findOne({ _id: objectId }, (err, result) => {
    if (err) return next(err);

    console.log('READ :', JSON.stringify(result, null, 2));
    res.json(result);
  });
});

// Insert
router.post('/notes', (req, res, next) => {
  const note = req.body;
  // TODO: use lodash or Underscore lib to check empty object
  if (Object.keys(note).length === 0) {
    const err = new Error('Invalid body content');
    return next(err);
  }

  const notes = db.collection('notes');
  notes.insertOne(note, (err, result) => {
    if (err) return next(err);

    result.result.id = result.insertedId;
    console.log('CREATE', result.result);
    res.json(result); 
  });
});

// Update
router.patch('/notes/:noteId', (req, res, next) => {
  const objectId = new ObjectId(req.params.noteId);
  const noteAttr = req.body;
  const notes = db.collection('notes');

  notes.updateOne({ _id: objectId }, { $set: noteAttr }, (err, result) => {
    if (err) return next(err);

    console.log('UPDATE :', result.result);
    res.json(result);
  });
});

// Delete
router.delete('/notes/:noteId', (req, res, next) => {
  const objectId = new ObjectId(req.params.noteId);
  const notes = db.collection('notes');

  notes.deleteOne({ _id: objectId }, (err, result) => {
    if (err) return next(err);

    console.log('DELETE :', result.result);
    res.json(result);
  });
});

/*
 * Init app and listen for connections
 */
const app = express();
app.use(bodyParser.json()); // parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // parsing application/x-www-form-urlencoded
app.use('/api', router);

// TODO: listen only if database connection succeed ?
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log('Express server listen on port ', port)
});
