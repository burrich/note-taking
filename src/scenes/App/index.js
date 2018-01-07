import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import { getNotes, createNote, updateNote, deleteNote } from '../../services/api';

import './styles/default.css';

import RichTextEditor from '../../components/RichTextEditor';
import NotesList from '../../components/NotesList';

/**
 * App scene functionnal component.
 *
 */
class App extends Component {
  constructor(props) {
    super(props);

    // TODO: notesLoaded => better way to manage first rendering ? => remove from state
    this.state = {
      notes: [],
      selectedNote: -1,
      focusEditor: false,
      notesLoaded: false
    };

    // this methods binding
    this.handleAddNote     = this.handleAddNote.bind(this);
    this.handleSelectNote  = this.handleSelectNote.bind(this);
    this.handleEditNote    = this.handleEditNote.bind(this);
    this.handleRemoveNote  = this.handleRemoveNote.bind(this);
    this.handleSaveNote    = this.handleSaveNote.bind(this);
    this.handleEditorFocus = this.handleEditorFocus.bind(this);
    this.handleEditorBlur  = this.handleEditorBlur.bind(this);
  }

  componentWillMount() {
    getNotes((err, notes) => {
      if (err) return console.error(err);

      console.log(notes);
      
      if (notes.length > 0) {
        this.setState({
          notes: notes,
          selectedNote: 0,
          focusEditor: true,
          notesLoaded: true
        });
      } else {
        this.setState({ notesLoaded: true });
      }
    });
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
      newNote._id = result.insertedId;
      updatedNotes.push(newNote);

      this.setState({
        notes: updatedNotes,
        selectedNote: updatedNotes.length - 1,
        focusEditor: true
      });
    });
  }

  handleSelectNote(index) {
    this.setState({
      selectedNote: index,
      focusEditor: true
    });
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

  // TODO: remove id param ?
  handleRemoveNote(id, index) {
    deleteNote(id, (err, result) => {
      if (err) return console.error(err);

      console.log(result);

      const notes = this.state.notes;
      const updatedNotes = notes.filter(note => note._id !== id);

      // Update notes list selected index
      let selectedNote = this.state.selectedNote;
      if (index <= selectedNote) {
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

  handleEditorFocus() {
    this.setState({ focusEditor: true });
  }

  handleEditorBlur() {
    this.setState({ focusEditor: false });
  }

  render() {
    const selectedNote = this.state.selectedNote;
    if (!this.state.notesLoaded) { // Initial state
      return (
        <div>Loadings notes...</div>
      );
    }

    const notes = this.state.notes;
    const editorDisabled = (notes.length === 0) ? true : false;

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
                disabled={editorDisabled}
                onSave={this.handleSaveNote}
                onFocus={this.handleEditorFocus}
                onBlur={this.handleEditorBlur}
                isFocus={this.state.focusEditor} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
