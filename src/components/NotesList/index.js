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

    this.state = { newNote: '' };
    
    this.handleAddNoteChange  = this.handleAddNoteChange.bind(this);
    this.handleAddNoteKeyDown = this.handleAddNoteKeyDown.bind(this);
  }

  handleAddNoteChange(e) {
    this.setState({ newNote: e.target.value })
  }

  handleAddNoteKeyDown(e) {
    // TODO: declare key outside (util module)
    const ENTER_KEY = 13;

    if (e.keyCode !== ENTER_KEY) {
      return;
    }

    e.preventDefault();
    const newNote = this.state.newNote.trim();

    if (newNote) {
      this.props.onAddNote(newNote);
      this.setState({ newNote: '' });
    }
  }

  render() {
    const newNote = this.state.newNote;

    const notes = this.props.notes;
    const notesListItems = notes.map((note, index) =>
      <NotesListItem 
        key={note.id} 
        note={note}
        onSelect={this.props.onSelectNote.bind(this, index)}
        onRemove={this.props.onRemoveNote} />
    );

    return (
      <div className="NotesList-root">
        <div className="NotesList-add">
          <input
            type="text"
            className="no-border"
            placeholder="Add a note"
            value={newNote}
            onChange={this.handleAddNoteChange}
            onKeyDown={this.handleAddNoteKeyDown} />
        </div>

        <div className="NotesList-content">
          {notesListItems}
        </div>
      </div>
    );
  }
}

export default NotesList;
