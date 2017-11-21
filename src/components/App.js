import React from 'react';
import RichTextEditor from './RichTextEditor';

import './App.css';

/**
 * App functionnal component
 *
 */
function App() {
  return (
    <div className="App">
      <h1>Note taking</h1>

      <RichTextEditor />
    </div>
  );
}

export default App;
