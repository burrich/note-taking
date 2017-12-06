import React, { Component } from 'react';
import ReactModal from 'react-modal'

/**
 * Modal container component.
 * TODO: style prop
 */
class Modal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ReactModal 
        isOpen={this.props.show}
        onRequestClose={this.props.onClose}
        style={{
          overlay: {
            zIndex: 1,
          },
          content: {
            top: 10,
            left: 10,
            right: 'initial',
            bottom: 'initial',
            padding: 15,
          }
        }}>

        {this.props.children}
      </ReactModal>
    );
  }
}

export default Modal;
