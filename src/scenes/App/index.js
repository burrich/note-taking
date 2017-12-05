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
      notes: NOTES
    };

    // this methods binding
    this.handleRemoveNote = this.handleRemoveNote.bind(this);
  }

  handleRemoveNote(id) {
    const notes = this.state.notes;
    const updatedNotes = notes.filter(note => note.id !== id);

    this.setState({ notes: updatedNotes });
  }

  render() {
    const notes = this.state.notes;

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
                onRemoveNote={this.handleRemoveNote} />
            </div>

            <div className="container-right">
              <RichTextEditor note={notes[0]} />
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
