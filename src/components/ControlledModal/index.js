import React from 'react';
import { Modal } from 'semantic-ui-react';

/**
 * Semantic UI controlled modal component.
 */
function ControlledModal(props) {
  return (
    <Modal 
      open={props.open}
      onClose={props.onClose}
      size={props.size}>

      <Modal.Header>{props.header}</Modal.Header>

      <Modal.Content>{props.content}</Modal.Content>

      {props.modalActions}
    </Modal>
  );
}

export default ControlledModal;
