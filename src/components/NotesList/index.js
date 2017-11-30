import React, { Component } from 'react';
import ReactModal from 'react-modal'

import './styles/default.css';

/**
 * NotesList component.
 * TODO: modal component
 */
class NotesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: ['Note 1', 'Note 2', 'Note 3', 'Note 4' ,'Note 5'],
      newNote: '',
      editNote: '',
      selectedIndexNote: -1,
      showModal: false
    };

    // this methods binding
    this.handleNewNoteChange  = this.handleNewNoteChange.bind(this);
    this.handleNewNoteKeyDown = this.handleNewNoteKeyDown.bind(this);
    this.handleEditNoteSubmit = this.handleEditNoteSubmit.bind(this); 
    this.handleEditNoteChange = this.handleEditNoteChange.bind(this); 
    this.handleCloseModal     = this.handleCloseModal.bind(this);
  }

  handleNewNoteChange(e) {
    this.setState({ newNote: e.target.value });
  }

  handleNewNoteKeyDown(e) {
    // TODO: declare key outside
    const ENTER_KEY = 13;

    if (e.keyCode !== ENTER_KEY) {
      return;
    }

    e.preventDefault();
    const newNote = this.state.newNote.trim();

    if (newNote) {
      let updateNotes = this.state.notes;
      updateNotes.push(newNote);

      this.setState({
        notes: updateNotes,
        newNote: ''
      });

      // TODO: editor focus
    }
  }

  handleRemoveNote(noteIndex) {
    const notes = this.state.notes;
    const updateNotes = notes.filter((note) => notes.indexOf(note) !== noteIndex);

    this.setState({ notes: updateNotes });
  }

  handleEditNoteChange(e) {
    this.setState({ editNote: e.target.value });
  }

  handleEditNoteSubmit(e) {
    e.preventDefault();

    const selectedIndexNote = this.state.selectedIndexNote;
    const editNote          = this.state.editNote;
    const updateNotes       = this.state.notes;
    updateNotes[selectedIndexNote] = editNote;

    this.setState({ notes: updateNotes });
    this.handleCloseModal();
  }

  handleOpenModal(noteIndex) {
    this.setState({
      selectedIndexNote: noteIndex,
      editNote: this.state.notes[noteIndex],
      showModal: true
    });

    // TODO: input focus
  }
  
  handleCloseModal() {
    this.setState({ showModal: false });

    // TODO: input focus
  }

  render() {
    const newNote = this.state.newNote;
    const notes = this.state.notes.map((note, index) =>
      <div key={index} className="NotesList-item">
        <div className="NotesList-item-value">
          {note}
        </div>

        <div className="NotesList-item-controls">
          <span onClick={this.handleOpenModal.bind(this, index)} style={{ cursor: 'pointer' }}>E</span> {/* */}
          <span onClick={this.handleRemoveNote.bind(this, index)} style={{ cursor: 'pointer' }}>X</span>
        </div>
      </div>
    );

    return (
      <div className="NotesList-root">
        <div className="NotesList-add">
          <input 
            type="text"
            placeholder="Add a note"
            value={newNote}
            onKeyDown={this.handleNewNoteKeyDown}
            onChange={this.handleNewNoteChange} />
        </div>

        <div className="NotesList-content">
          {notes}
        </div>

        <ReactModal 
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
          onRequestClose={this.handleCloseModal}
          style={{
            overlay: {
              zIndex: 1,
            },
            content: {
              top: 10,
              left: 10,
              right: 'initial',
              bottom: 'initial',
              padding: 15,
            }
          }}>

          <form onSubmit={this.handleEditNoteSubmit}>
            <label for="note-name">Note name : </label>
            <input 
              type="text" 
              id="note-name" 
              value={this.state.editNote} 
              onChange={this.handleEditNoteChange} />

            <input type="submit" value="Update" />
          </form>
        </ReactModal>        
      </div>
    );
  }
}

export default NotesList;
