import React, { Component } from 'react';
import { Icon, Modal, Form, Input, Button } from 'semantic-ui-react';

/**
 * Modal for editing notes implementing Semantic UI Modal component.
 */
class EditNoteModal extends Component {
  constructor(props) {
    super(props);

    this.state = { inputName: '' };

    this.handleFormSubmit      = this.handleFormSubmit.bind(this);
    this.handleInputNameChange = this.handleInputNameChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const nextNote = nextProps.note;
    if (nextNote) {
      this.setState({ inputName: nextNote.name });
    } else {
      this.setState({ inputName: '' });
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const submitName = this.state.inputName;
    this.props.onClose(e, null, submitName);
  }

  handleInputNameChange(e) {
    this.setState({ inputName: e.target.value });
  }

  render() {
    const note = this.props.note;
    let editForm = null;

    if (note) {
      editForm = (
        <Form>
          <Form.Field inline>
            <label>Name : </label>
            <Input 
              value={this.state.inputName}
              onChange={this.handleInputNameChange} />
          </Form.Field>
        </Form>
      );
    }

    return (
      <Modal
        open={this.props.open}
        onClose={this.props.onClose}
        size="mini">

        <Modal.Header>Update note name</Modal.Header>

        <Modal.Content>
          <Modal.Description>{editForm}</Modal.Description>
        </Modal.Content>

        <Modal.Actions>
          <Button 
            content="Cancel"
            onClick={this.props.onClose} />

          <Button 
            content="Submit"
            onClick={this.handleFormSubmit}
            positive />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default EditNoteModal;
