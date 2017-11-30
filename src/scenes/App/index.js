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
            <NotesList />
          </div>

          <div className="container-right">
            <RichTextEditor />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
