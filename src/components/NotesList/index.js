import React, { Component } from 'react';
import { List, Input } from 'semantic-ui-react';

import './styles/default.css';

import NotesListItem from './NotesListItem'; 
import EditNoteModal from './EditNoteModal';

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
    
    this.handleAddNoteChange = this.handleAddNoteChange.bind(this);
    this.handleAddNote       = this.handleAddNote.bind(this);
    this.handleCloseModal    = this.handleCloseModal.bind(this);
  }

  handleAddNoteChange(e) {
    this.setState({ newNote: e.target.value })
  }

  handleAddNote(e) {
    // TODO: declare key outside (util module)
    const ENTER_KEY = 13;
    if (e.type === 'keydown' && e.keyCode !== ENTER_KEY) {
        return;
    }

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
        onRemove={this.props.onRemoveNote.bind(this, note._id, index)} />
    }); 

    return (
      <div className="NotesList-root">
        <div className="NotesList-add">
          <Input
            action={{ icon: 'add', onClick: this.handleAddNote }}
            placeholder="Add a note"
            value={this.state.newNote}
            onChange={this.handleAddNoteChange}
            onKeyDown={this.handleAddNote} />
        </div>

        <div className="NotesList-content">
          <List link 
                size="large">
            {notesListItems}
          </List>
        </div>

        <EditNoteModal
          note={this.state.editedNote}
          open={this.state.showModal}
          onClose={this.handleCloseModal} />
      </div>
    );
  }
}

export default NotesList;
