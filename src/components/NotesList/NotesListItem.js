import React, { Component } from 'react';

/**
 * NotesListItem component.
 */
class NotesListItem extends Component {
  constructor(props) {
    super(props);

    // this methods binding
  }

  render() {
    const name = this.props.name;

    return (
      <div className="NotesList-item">
        <div className="NotesList-item-value">
          {name}
        </div>

        <div className="NotesList-item-controls">
          <span style={{ cursor: 'pointer' }}>E</span> {/* */}
          <span style={{ cursor: 'pointer' }}>X</span>
        </div>
      </div>
    );
  }
}

export default NotesListItem;
