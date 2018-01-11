import React, { Component } from 'react';
import { Icon, Modal, Form, Input, Button } from 'semantic-ui-react';

/**
 * Modal for editing notes implementing Semantic UI Modal component.
 */
class EditNoteModal extends Component {
  constructor(props) {
    super(props);

    this.state = { inputName: '' };

    this.handleFormSubmit       = this.handleFormSubmit.bind(this);
    this.handleInputNameChange  = this.handleInputNameChange.bind(this);
    this.handleInputNameKeyDown = this.handleInputNameKeyDown.bind(this);
    this.handleInputNameRef     = this.handleInputNameRef.bind(this);
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

  /**
   * Handle input name focus on modal opening.
   * 
   * We're not setting element to an instance variable (ref)
   * because it could be null inside componentDidUpdate().
   * Input name processing must be done here, could not doing it inside onOpen Modal prop.
   * See https://github.com/Semantic-Org/Semantic-UI-React/issues/901.
   */
  handleInputNameRef(el) {
    if (el) {
      const length = el.props.value.length;
      el.inputRef.setSelectionRange(length, length);
      el.focus();
    }
  }

  render() {
    const editForm = (
      <Form>
        <Form.Field inline>
          <label>Name : </label>
          <Input 
            value={this.state.inputName}
            ref={this.handleInputNameRef}
            onChange={this.handleInputNameChange}
            onKeyDown={this.handleInputNameKeyDown} />
        </Form.Field>
      </Form>
    );

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
