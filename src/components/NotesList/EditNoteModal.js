import React, { Component } from 'react';
import Modal from '../Modal'

/**
 * Modal for editing notes implementing Modal component.
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
    this.props.onClose(e, submitName);
  }

  handleInputNameChange(e) {
    this.setState({ inputName: e.target.value });
  }

  render() {
    const note = this.props.note;
    let form = null;

    if (note) {
      form = (
        <form onSubmit={this.handleFormSubmit} className="form-inline">
          <label htmlFor="note-name">Note name : </label>
          <input
            type="text"
            id="note-name" 
            value={this.state.inputName} 
            onChange={this.handleInputNameChange} />
          <input
            type="submit"
            value="Update"
            className="btn"
            style={{ cursor: 'pointer' }} />
        </form>
      );
    }

    return (
      <Modal 
        show={this.props.show}
        onClose={this.props.onClose}>
        
        {form}
      </Modal>
    );
  }
}

export default EditNoteModal;
