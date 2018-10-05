import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

import './styles/default.css';

import RichTextEditor from '../../components/RichTextEditor';
import NotesList from '../../components/NotesList';
import storageApi from '../../services/storageApi.js';

const LOG_TAG = '[App]';

/**
 * App scene functionnal component.
 *
 */
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: null,
      selectedNote: -1,
      focusEditor: false
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

  componentDidMount() {
    // Fetch notes from API and update state.
    storageApi.getNotes((err, notes) => {
      if (err) return console.error(err);
  
      console.log(LOG_TAG, 'notes', notes);
      
      let updatedState = { notes: notes };
  
      if (notes.length > 0) {
        Object.assign(updatedState, {
          selectedNote: 0,
          focusEditor: true
        });
      }
      this.setState(updatedState);
    });
  }

  handleAddNote(name) {
    // TODO: define newNote in RTE
    const newNote = {
      name: name,
      entityMap: {},
      blocks: [
        {
          key: '8i5rc',
          text: '',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        }
      ]
    };

    storageApi.createNote(newNote, (err, result) => {
      if (err) return console.error(err);

      console.log(LOG_TAG, result);

      // Update state 

      const updatedNotes = this.state.notes.slice();

      // Add id to state note for server side storage only (mongodb)
      if (process.env.REACT_APP_BACKEND === '1') {
        newNote.id = result.insertedId;
      }

      updatedNotes.push(newNote);

      console.log(LOG_TAG, 'createNote() => newNote', newNote);

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

    storageApi.updateNote(id, nameToJson, (err, result) => {
      if (err) return console.error(err);

      console.log(LOG_TAG, result);

      // Update state
      // _id ?
      const updatedNotes = this.state.notes.slice();
      updatedNotes.find(elt => elt._id === id).name = name;

      this.setState({ notes: updatedNotes });
    });
  }

  // TODO: remove id param ?
  handleRemoveNote(id, index) {
    storageApi.deleteNote(id, (err, result) => {
      if (err) return console.error(err);

      console.log(LOG_TAG, result);

      const notes = this.state.notes;
      const updatedNotes = notes.filter(note => note.id !== id);

      // Update notes list selected index
      let selectedNote = this.state.selectedNote;
      if (selectedNote > 0 && index <= selectedNote) {
        selectedNote--;
      }

      this.setState({
        notes: updatedNotes,
        selectedNote: selectedNote
      });
    });
  }

  handleSaveNote(note) {
    // _id ?
    const id = note._id;
    const rteAttrToJson = JSON.stringify({
      entityMap: note.entityMap,
      blocks: note.blocks
    });

    // updateNote(id, rteAttrToJson, (err, result) => {
    //   if (err) return console.error(err);

    //   console.log(result);

    //   // Update state
    //   const updatedNotes = this.state.notes.slice();
    //   const index = updatedNotes.findIndex(elt => elt._id === id);

    //   updatedNotes[index] = note;
    //   this.setState({ notes: updatedNotes });
    // });


    // const updatedNoteToJson = JSON.stringify(note);
    // updateNoteLocal(id, updatedNoteToJson, (err, result) => {
    //   if (err) return console.error(err);

    //   console.log(result);

    //   // Update state
    //   const updatedNotes = this.state.notes.slice();
    //   const index = updatedNotes.findIndex(elt => elt._id === id);

    //   updatedNotes[index] = note;

    //   console.log('2 save', note);

    //   this.setState({ notes: updatedNotes });
    // });
  }

  handleEditorFocus() {
    this.setState({ focusEditor: true });
  }

  handleEditorBlur() {
    this.setState({ focusEditor: false });
  }

  /**
   * Diplay a loading message when notes aren't loaded
   * or render Header, NotesList and RichTextEditor components.
   * 
   * On RichTextEditor, key attribute create a new instance instead of update.
   * see https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
   */
  render() {
    const notes = this.state.notes;
    if (!notes) { // Initial state
      return (
        <div>Loadings notes...</div>
      );
    }
    
    const selectedNote = this.state.selectedNote;
    const currentNote = notes[selectedNote];
    const currentNoteId = currentNote ? currentNote.id : null;
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
                note={currentNote}
                key={currentNoteId}
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
