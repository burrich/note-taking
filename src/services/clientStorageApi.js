import Dexie from 'dexie';

/**
 * Retrieve notes from a client side storage (indexedDB wrapped by Dexie.js).
 * Used by heroku demo.
 */

// DB init
const db = new Dexie('demoDB');
db.version(1).stores({
  notes: '++id'
});

function getNotes(callback) {
  db.notes
    .toArray(notes => {
      callback(null, notes);
    })
    .catch(err => {
      callback(err);
    });
}

function createNote(note, callback) {
  db.notes
    .add(note)
    .then(id => {
      callback(null, { insertedId: id });
    })
    .catch(err => {
      callback(err);
    });
}

function updateNote(id, attr, callback) {
  db.notes
    .update(id, attr)
    .then(updated => {
      if (updated) {
        const result = {
          n: 1, 
          nModified: 1, 
          ok: 1
        }

        callback(null, true, result);
      } else { // updated === 0
        callback(null, false);
      }
    })
    .catch(err => {
      callback(err);
    });
}

function deleteNote(id, callback) {
  db.notes
    .delete(id)
    .then(() => {
      callback(null, `note ${id} successfully deleted`);
    })
    .catch(err => {
      callback(err);
    });
}

export { getNotes, createNote, updateNote, deleteNote };