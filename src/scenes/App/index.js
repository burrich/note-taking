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

    if (process.env.REACT_APP_BACKEND === '1') {
      this.backendMode = true;
    } // else <=> indexedDB only (dexie.js)

    // this methods binding
    this.handleAddNote     = this.handleAddNote.bind(this);
    this.handleSelectNote  = this.handleSelectNote.bind(this);
    this.handleUpdateNote  = this.handleUpdateNote.bind(this);
    this.handleRemoveNote  = this.handleRemoveNote.bind(this);
    this.handleEditorFocus = this.handleEditorFocus.bind(this);
    this.handleEditorBlur  = this.handleEditorBlur.bind(this);
  }

  componentDidMount() {
    // Fetch notes from API and update state.
    storageApi.getNotes((err, notes) => {
      if (err) return console.error(err);
  
      // console.log(LOG_TAG, 'notes', notes);

      let updatedState;

      if (notes.length > 0) {
        // Rename _id key to id for server side storage only (mongodb)
        if (this.backendMode) {
          notes.map(note => {
            note.id = note._id;
            delete note._id;
            return note;
          });
        }

        updatedState = { 
          notes: notes,
          selectedNote: 0,
          focusEditor: true
        };
      } else {
        updatedState = { 
          notes: notes,
        };
      }
      
      this.setState(updatedState);
    });
  }

  handleAddNote(name) {
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

      // console.log(LOG_TAG, 'createNote() result :', result);

      // Update state 

      const updatedNotes = this.state.notes.slice();

      // Add id to state note for server side storage only (mongodb)
      if (this.backendMode) {
        newNote.id = result.insertedId;
      }

      updatedNotes.push(newNote);

      console.log(LOG_TAG, 'new note added :', newNote);

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

  // TODO: remove id param ?
  handleRemoveNote(id, index) {
    storageApi.deleteNote(id, (err, result) => {
      if (err) return console.error(err);

      console.log(LOG_TAG, result);

      const notes = this.state.notes;
      const updatedNotes = notes.filter(note => note.id !== id);

      // Update notes list selected index
      let selectedNote = this.state.selectedNote;
      if (updatedNotes.length === 0 || (selectedNote > 0 && index <= selectedNote)) {
        selectedNote--;
      }

      this.setState({
        notes: updatedNotes,
        selectedNote: selectedNote,
        focusEditor: selectedNote !== -1
      });
    });
  }

  handleUpdateNote(id, attr) {
    storageApi.updateNote(id, attr, (err, updated, result) => {
      if (err) return console.error(err);
      if (!updated) return console.log(LOG_TAG, 'nothing to update');

      console.log(LOG_TAG, result);

      // Update state
      const notesToUpdate = this.state.notes.slice();
      const iNoteToUpdate = notesToUpdate.findIndex(elt => elt.id === id);
      notesToUpdate[iNoteToUpdate] = { ...notesToUpdate[iNoteToUpdate], ...attr};

      this.setState({ notes: notesToUpdate });
    });
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
                onEditNote={this.handleUpdateNote}
                onRemoveNote={this.handleRemoveNote} />
            </div>

            <div className="container-right">
              <RichTextEditor
                note={currentNote}
                key={currentNoteId}
                disabled={editorDisabled}
                onSave={this.handleUpdateNote}
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
