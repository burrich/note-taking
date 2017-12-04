import React from 'react';
import RichTextEditor from '../../components/RichTextEditor';
import NotesList from '../../components/NotesList';

import './styles/default.css';

/**
 * App scene functionnal component.
 *
 */
function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>Note taking</h1>
      </div>
      
      <div className="container-wrapper">
        <div className="container">
          <div className="container-left">
            <NotesList notes={NOTES} />
          </div>

          <div className="container-right">
            <RichTextEditor note={NOTES[0]} />
          </div>
        </div>
      </div>
    </div>
  );
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
