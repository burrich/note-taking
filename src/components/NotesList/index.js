import React, { Component } from 'react';
// import ReactModal from 'react-modal'

import './styles/default.css';

/**
 * NotesList component.
 * TODO: modal component
 */
class NotesList extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   notes: ['Note 1', 'Note 2', 'Note 3', 'Note 4' ,'Note 5'],
    //   newNote: '',
    //   editNote: '',
    //   selectedIndexNote: -1,
    //   showModal: false
    // };

    // this methods binding
  }

  render() {
    // const newNote = this.state.newNote;
    
    const notes = this.props.notes.map((note) =>
      <div key={note.id} className="NotesList-item">
        <div className="NotesList-item-value">
          {note.name}
        </div>

        <div className="NotesList-item-controls">
          <span style={{ cursor: 'pointer' }}>E</span> {/* */}
          <span style={{ cursor: 'pointer' }}>X</span>
        </div>
      </div>
    );

    return (
      <div className="NotesList-root">
        <div className="NotesList-add">
          <input 
            type="text"
            className="no-border"
            placeholder="Add a note" />
        </div>

        <div className="NotesList-content">
          {notes}
        </div>
      </div>
    );
  }
}

export default NotesList;
