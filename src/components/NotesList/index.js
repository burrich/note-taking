import React, { Component } from 'react';
// import ReactModal from 'react-modal'
import NotesListItem from './NotesListItem'; 

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
  }

  render() {
    // const newNote = this.state.newNote;
    const notes = this.props.notes;
    const notesListItems = notes.map((note) =>
      <NotesListItem 
        key={note.id} 
        note={note}
        onRemove={this.props.onRemoveNote} />
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
          {notesListItems}
        </div>
      </div>
    );
  }
}

export default NotesList;
