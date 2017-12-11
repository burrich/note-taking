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
    let listItemClass = 'NotesList-item-value';
    listItemClass = this.props.selected ? ' NotesList-item-selected' : ''; 

    return (
      <div className="NotesList-item">
        <div className={listItemClass}>
          <span onClick={this.props.onSelect}>
            {note.name}
          </span>
        </div>

        <div className="NotesList-item-controls">
          <span onClick={this.props.onEdit}>
            E
          </span> {/* */}
          <span onClick={this.props.onRemove}>
            X
          </span>
        </div>
      </div>
    );
  }
}

export default NotesListItem;
