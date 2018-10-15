import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './scenes/Login';
import NoteEditor from './scenes/NoteEditor';

import './app.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={NoteEditor} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;