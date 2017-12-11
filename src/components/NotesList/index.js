import React, { Component } from 'react';
import NotesListItem from './NotesListItem'; 
import EditNoteModal from './EditNoteModal';

import './styles/default.css';

/**
 * NotesList component.
 * TODO: modal component
 */
class NotesList extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      newNote: '',
      editedNote: null,
      showModal: false
    };
    
    this.handleAddNoteChange  = this.handleAddNoteChange.bind(this);
    this.handleAddNoteKeyDown = this.handleAddNoteKeyDown.bind(this);
    this.handleCloseModal     = this.handleCloseModal.bind(this);
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

  handleOpenModal(note) {
    this.setState({
      editedNote: note,
      showModal: true
    });
  }

  handleCloseModal(e, submitName) {
    if (submitName) {
      const editedNote = this.state.editedNote;
      this.props.onEditNote(editedNote._id, submitName);
    }

    this.setState({
      editedNote: null,
      showModal: false
    });
  }

  render() {
    const newNote    = this.state.newNote;
    const editedNote = this.state.editedNote;
    const showModal  = this.state.showModal;

    const notes = this.props.notes;
    const notesListItems = notes.map((note, index) => {
      const selected = (index === this.props.selectedNote) ? true : false;

      return <NotesListItem 
        key={note._id}
        note={note}
        selected={selected}
        onSelect={this.props.onSelectNote.bind(this, index)}
        onEdit={this.handleOpenModal.bind(this, note)}
        onRemove={this.props.onRemoveNote.bind(this, note._id)} />
    });

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

        <EditNoteModal 
          show={showModal}
          onClose={this.handleCloseModal}
          note={editedNote} />
      </div>
    );
  }
}

export default NotesList;
