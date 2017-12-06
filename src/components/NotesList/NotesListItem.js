import React, { Component } from 'react';

/**
 * NotesListItem component.
 */
class NotesListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const note = this.props.note;

    return (
      <div className="NotesList-item">
        <div className="NotesList-item-value">
          <span 
            style={{ cursor: 'pointer' }}
            onClick={this.props.onSelect}>

            {note.name}
          </span>
        </div>

        <div className="NotesList-item-controls">
          <span 
            style={{ cursor: 'pointer' }}
            onClick={this.props.onEdit}>

            E
          </span> {/* */}
          <span 
            style={{ cursor: 'pointer' }}
            onClick={this.props.onRemove}>

            X
          </span>
        </div>
      </div>
    );
  }
}

export default NotesListItem;
