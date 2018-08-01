import React, { Component } from 'react';
import { Modal, Form, Input, Button } from 'semantic-ui-react';

import ControlledModal from '../ControlledModal';

/**
 * Modal for editing notes names 
 * implementing Semantic UI Modal component with ControlledModal.
 */
class EditNoteModal extends Component {
  constructor(props) {
    super(props);

    this.state = { inputName: props.noteName };

    this.inputNameElt = React.createRef();

    this.handleFormSubmit       = this.handleFormSubmit.bind(this);
    this.handleInputNameChange  = this.handleInputNameChange.bind(this);
    this.handleInputNameKeyDown = this.handleInputNameKeyDown.bind(this);
  }

  componentDidMount() {
    // Auto-focus
    if (this.props.open) {
      this.inputNameElt.current.focus();
    }
  }

  handleFormSubmit(e) {
    if (e) {
      e.preventDefault();
    }

    const submitName = this.state.inputName;
    this.props.onClose(e, null, submitName.trim());
  }

  handleInputNameChange(e) {
    this.setState({ inputName: e.target.value });
  }

  handleInputNameKeyDown(e) {
    const ENTER_KEY = 13;
    if (e.keyCode !== ENTER_KEY) {
        return;
    }

    this.handleFormSubmit();
  }

  render() {
    const form = (
      <Form>
        <Form.Field inline>
          <label>Name : </label>
          <Input 
            value={this.state.inputName}
            ref={this.inputNameElt}
            onChange={this.handleInputNameChange}
            onKeyDown={this.handleInputNameKeyDown} />
        </Form.Field>
      </Form>
    );

    const modalActions = (
      <Modal.Actions>
        <Button 
          content="Cancel"
          onClick={this.props.onClose} />

        <Button 
          content="Submit"
          onClick={this.handleFormSubmit}
          positive />
      </Modal.Actions>
    );

    return (
      <ControlledModal 
        open={this.props.open}
        onClose={this.props.onClose}
        size="mini"
        header="Update note name"
        content={form}
        modalActions={modalActions} />
    );
  }
}

export default EditNoteModal;