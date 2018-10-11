/**
 * Retrieve mongodb data from express restful api.
 */

// const LOG_TAG = '[serverStorageApi]';

function initRequest(method, body = null) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  return {
    method: method,
    mode: 'cors',
    headers: headers,
    body: body
  };
}

function getNotes(callback) {
  // TODO: timeout
  fetch('/api/notes', initRequest('GET'))
    .then(res => {
      if (!res.ok) {
        throw new Error('Response failed');
      }
      // console.log(LOG_TAG, 'getNotes()', res);

      return res.json();
    })
    .then(data => {
      if (!data) {
        throw new Error('Unexpected json result : ' + JSON.stringify(data));
      }
      callback(null, data);
    })
    .catch(err => {
      callback(err);
    });
}

function createNote(note, callback) {
  const noteJson = JSON.stringify(note);

  fetch('/api/notes', initRequest('POST', noteJson))
    .then(res => {
      if (!res.ok) {
        throw new Error('Response failed');
      }
      // console.log(LOG_TAG, 'createNote()', res);

      return res.json();
    })
    .then(result => {
      if (!result || !result.ok || result.n !== 1) {
        throw new Error('Unexpected json result : ' + JSON.stringify(result));
      }
      callback(null, result);
    })
    .catch(err => {
      callback(err);
    });
}

// TODO: rename noteAttr
function updateNote(id, noteAttr, callback) {
  const noteAttrJson = JSON.stringify(noteAttr);

  fetch('/api/notes/' + id, initRequest('PATCH', noteAttrJson))
    .then(res => {
      if (!res.ok) {
        throw new Error('Response failed');
      }
      // console.log(LOG_TAG, 'updateNote()', res);
      
      return res.json();
    })
    .then(result => {
      if (!result || !result.ok || result.n !== 1) {
        throw new Error('Unexpected json result : ' + JSON.stringify(result));
      }

      if (result.nModified === 0) {
        callback(null, false);
      } else {
        callback(null, true, `note ${id} updated`);
      }
    })
    .catch(err => {
      callback(err);
    });
}

function deleteNote(id, callback) {
  fetch('/api/notes/' + id, initRequest('DELETE'))
    .then(res => {
      if (!res.ok) {
        throw new Error('Response failed');
      }
      // console.log(LOG_TAG, 'deleteNote()', res);

      return res.json();
    })
    .then(result => {
      if (!result || !result.ok || result.n !== 1) {
        throw new Error('Unexpected json result : ' + JSON.stringify(result));
      }
      callback(null, `note ${id} successfully deleted`);
    })
    .catch(err => {
      callback(err);
    });
}

export { getNotes, createNote, updateNote, deleteNote };