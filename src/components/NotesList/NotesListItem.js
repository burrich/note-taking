import React from 'react';
import { List, Icon } from 'semantic-ui-react';

/**
 * NotesListItem component.
 */
function NotesListItem(props) {
  return (
    <List.Item as="a" active={props.selected}>
      <List.Content floated='right'>
        <Icon link name="write" onClick={props.onEdit} />
        <Icon link name="remove" onClick={props.onRemove} />
      </List.Content>

      <List.Content onClick={props.onSelect}>
        {props.note.name}
      </List.Content>
    </List.Item>
  );
}

export default NotesListItem;
