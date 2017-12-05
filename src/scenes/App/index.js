import React, { Component } from 'react';
import RichTextEditor from '../../components/RichTextEditor';
import NotesList from '../../components/NotesList';

import './styles/default.css';

/**
 * App scene functionnal component.
 *
 */
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: NOTES,
      idNoteCounter: NOTES.length,
      selectedNote: 0
    };

    // this methods binding
    this.handleAddNote    = this.handleAddNote.bind(this);
    this.handleSelectNote = this.handleSelectNote.bind(this);
    this.handleEditNote   = this.handleEditNote.bind(this);
    this.handleRemoveNote = this.handleRemoveNote.bind(this);
  }

  handleAddNote(name) {
    const updatedNotes  = this.state.notes;
    const idNoteCounter = this.state.idNoteCounter + 1;

    updatedNotes.push(
      {
        "id": idNoteCounter,
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
    );

    this.setState({ 
      notes: updatedNotes, 
      idNoteCounter: idNoteCounter,
      selectedNote: updatedNotes.length - 1
    })

    // TODO: editor focus
  }

  handleSelectNote(index) {
    this.setState({ selectedNote: index });
  }

  handleEditNote(id, name) {
    // swallow copy for immutability
    const updatedNotes = this.state.notes.slice();
    updatedNotes.find(elt => elt.id === id).name = name;

    this.setState({ notes: updatedNotes });
  }

  handleRemoveNote(id) {
    const notes = this.state.notes;
    const updatedNotes = notes.filter(note => note.id !== id);
    
    let selectedNote = this.state.selectedNote;
    if (selectedNote !== 0) {
      selectedNote--;
    }

    this.setState({ 
      notes: updatedNotes,
      selectedNote: selectedNote
    });
  }

  render() {
    const notes        = this.state.notes;
    const selectedNote = this.state.selectedNote;

    return (
      <div className="App">
        <div className="header">
          <h1>Note taking</h1>
        </div>
        
        <div className="container-wrapper">
          <div className="container">
            <div className="container-left">
              {/* TODO: pass only notes names */}
              <NotesList 
                notes={notes}
                onAddNote={this.handleAddNote}
                onSelectNote={this.handleSelectNote}
                onEditNote={this.handleEditNote}
                onRemoveNote={this.handleRemoveNote} />
            </div>

            <div className="container-right">
              <RichTextEditor note={notes[selectedNote]} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const NOTES = [
  {
    "id": 1,
    "name": "Note 1",
    "entityMap": {},
    "blocks": [
      {
        "key": "8i5rc",
        "text": "hello world !",
        "type": "blockquote",
        "depth": 0,
        "inlineStyleRanges": [
          {
            "offset": 0,
            "length": 13,
            "style": "ITALIC"
          }
        ],
        "entityRanges": [],
        "data": {}
      },
      {
        "key": "8kjpt",
        "text": "By Burrich ",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [
          {
            "offset": 3,
            "length": 7,
            "style": "BOLD"
          }
        ],
        "entityRanges": [],
        "data": {}
      }
    ]
  },
  {
    "id": 2,
    "name": "Note 2",
    "entityMap": {},
    "blocks": [
      {
        "key": "5atf5",
        "text": "foo",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      }
    ]
  },
  {
    "id": 3,
    "name": "Note 3",
    "entityMap": {},
    "blocks": [
      {
        "key": "5atf5",
        "text": "bar",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      }
    ]
  },
];

export default App;
