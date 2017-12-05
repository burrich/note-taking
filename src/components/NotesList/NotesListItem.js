import React, { Component } from 'react';

/**
 * NotesListItem component.
 */
class NotesListItem extends Component {
  constructor(props) {
    super(props);
  }

  handleRemove(id) {
    this.props.onRemove(id);
  }

  render() {
    const note = this.props.note;

    return (
      <div className="NotesList-item">
        <div className="NotesList-item-value">
          {note.name}
        </div>

        <div className="NotesList-item-controls">
          <span style={{ cursor: 'pointer' }}>E</span> {/* */}
          <span 
            style={{ cursor: 'pointer' }}
            onClick={this.handleRemove.bind(this, note.id)}>

            X
          </span>
        </div>
      </div>
    );
  }
}

export default NotesListItem;
