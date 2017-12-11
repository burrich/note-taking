import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import RichTextEditor from '../../components/RichTextEditor';
import NotesList from '../../components/NotesList';

import { getNotes, createNote, updateNote, deleteNote } from '../../services/api';

import './styles/default.css';

/**
 * App scene functionnal component.
 *
 */
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    getNotes((err, notes) => {
      if (err) return console.error(err);
      
      console.log(notes);

      this.setState({
        notes: notes,
        selectedNote: 0
      });
    });

    // this methods binding
    this.handleAddNote    = this.handleAddNote.bind(this);
    this.handleSelectNote = this.handleSelectNote.bind(this);
    this.handleEditNote   = this.handleEditNote.bind(this);
    this.handleRemoveNote = this.handleRemoveNote.bind(this);
    this.handleSaveNote   = this.handleSaveNote.bind(this);
  }

  handleAddNote(name) {
    // TODO: define newNote in RTE
    const newNote = {
      "name": name,
      "entityMap": {},
      "blocks": [
        {
          "key": "8i5rc",
          "text": "",
          "type": "unstyled",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
        }
      ]
    }
    const newNoteToJson = JSON.stringify(newNote);

    createNote(newNoteToJson, (err, result) => {
      if (err) return console.error(err);

      console.log(result);

      // Update state with inserted id
      const updatedNotes = this.state.notes.slice();
      newNote._id = result.id;
      updatedNotes.push(newNote);

      this.setState({
        notes: updatedNotes,
        selectedNote: updatedNotes.length - 1
      });
    });

    // TODO: editor focus
  }

  handleSelectNote(index) {
    this.setState({ selectedNote: index });
  }

  handleEditNote(id, name) {
    const nameToJson = JSON.stringify({ name: name });

    updateNote(id, nameToJson, (err, result) => {
      if (err) return console.error(err);

      console.log(result);

      // Update state
      const updatedNotes = this.state.notes.slice();
      updatedNotes.find(elt => elt._id === id).name = name;

      this.setState({ notes: updatedNotes });
    });
  }

  handleRemoveNote(id) {
    deleteNote(id, (err, result) => {
      if (err) return console.error(err);

      console.log(result);

      // Update state
      // TODO: log immutability !!!
      const notes = this.state.notes;
      const updatedNotes = notes.filter(note => note._id !== id);
      
      let selectedNote = this.state.selectedNote;
      if (selectedNote !== 0) {
        selectedNote--;
      }

      this.setState({ 
        notes: updatedNotes,
        selectedNote: selectedNote
      });
    });
  }

  handleSaveNote(note) {
    const id = note._id;
    const rteAttrToJson = JSON.stringify({
      entityMap: note.entityMap,
      blocks: note.blocks
    });

    updateNote(id, rteAttrToJson, (err, result) => {
      if (err) return console.error(err);

      console.log(result);

      // Update state
      const updatedNotes = this.state.notes.slice();
      const index = updatedNotes.findIndex(elt => elt._id === id);

      updatedNotes[index] = note;
      this.setState({ notes: updatedNotes });
    });
  }

  render() {
    const notes = this.state.notes;
    if (!notes) {
      return (
        <div>Loadings notes...</div>
      );
    }

    const selectedNote = this.state.selectedNote;
    return (
      <div className="App">
        <div className="header">
          <Header
            as="h1"
            content="Note taking"
            textAlign="center" />
        </div>

        <div className="container-wrapper">
          <div className="container">
            <div className="container-left">
              {/* TODO: pass only notes names */}
              <NotesList 
                notes={notes}
                selectedNote={selectedNote}
                onAddNote={this.handleAddNote}
                onSelectNote={this.handleSelectNote}
                onEditNote={this.handleEditNote}
                onRemoveNote={this.handleRemoveNote} />
            </div>

            <div className="container-right">
              <RichTextEditor
                note={notes[selectedNote]}
                onSave={this.handleSaveNote} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
