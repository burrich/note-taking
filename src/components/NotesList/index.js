import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
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
      showModal: true,
      editedNote: note
    });
  }

  handleCloseModal(e, data, submitName) {
    if (submitName) {
      const editedNote = this.state.editedNote;
      this.props.onEditNote(editedNote._id, submitName);
    }

    this.setState({
      showModal: false,
      editedNote: null
    });
  }

  render() {
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
            value={this.state.newNote}
            onChange={this.handleAddNoteChange}
            onKeyDown={this.handleAddNoteKeyDown} />
        </div>

        <List link>
          {notesListItems}
        </List>

        <EditNoteModal
          note={this.state.editedNote}
          open={this.state.showModal}
          onClose={this.handleCloseModal} />
      </div>
    );
  }
}

export default NotesList;
