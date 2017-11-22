import React from 'react';
import RichTextEditor from '../../components/RichTextEditor';

import './styles/default.css';

/**
 * App scene functionnal component.
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
