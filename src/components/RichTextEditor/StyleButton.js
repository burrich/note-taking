import React, { Component } from 'react';

import './styles/style-button.css';

/**
 * StyleButton component.
 */
class StyleButton extends Component {
  constructor(props) {
    super(props);
    this.style = this.props.style;
    
    // this methods binding
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(e) {
    e.preventDefault();
    this.props.onToggle(this.style.code);
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return(
      <span className={className}
            onMouseDown={this.onToggle}>
        {this.style.label}
      </span>
    );
  }
}

export default StyleButton;
