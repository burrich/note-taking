
/**
 * Retrieve notes from Local Storage.
 */

// TODO: previous / current / null ?
let notesId = 0;

function getNotes(callback) {
  callback(null, []);
}

function createNote(note, name, callback) {
  let id = window.localStorage.getItem('notesId');
  console.log('id', id);
  window.localStorage.setItem(name + id, note);
  
  callback(null, { insertedId: 0 });
  window.localStorage.setItem('notesId', ++id);
  console.log('id', id);
}

function updateNote(key, note, callback) {
  window.localStorage.setItem(key, note);
  
  const result = null;
  callback(null, result);
}

function initNotesId() {
  window.localStorage.setItem('notesId', 0); // TODO: to json
}

function incrementNotesId() {
  // window.localStorage.setItem('notesId', 0); // TODO: to json
}

export { getNotes, createNote, updateNote, initNotesId };