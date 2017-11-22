import React, { Component } from 'react';

import './styles/style-button.css';

/**
 * StyleButton component which can be inline or block (props.type).
 */
class StyleButton extends Component {
  constructor(props) {
    super(props);
    this.type = this.props.type;
    this.style = this.getStyle();
    
    // this methods binding
    this.onToggle = this.onToggle.bind(this);
  }

  getStyle() {
    if (this.type === 'inline') {
      return inlineStyles[this.props.name];
    }
    // this.type === 'block'
    return blockStyles[this.props.name];
  }

  isActive() {
    const editorStyle = this.props.editorStyle;

    if (this.type === 'inline') {
      return editorStyle.has(this.style.code);
    }
    // this.type === 'block'
    return editorStyle === this.style.code;
  }

  onToggle(e) {
    e.preventDefault();
    this.props.onToggle(this.style.code);
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.isActive()) {
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

// TODO: moves styles objects to Controls ?
// Label and style name for inline StyleButton components
const inlineStyles = {
  bold: {
    code: 'BOLD',
    label: 'Bold'
  },
  italic: {
    code: 'ITALIC',
    label: 'Italic'
  },
  underline: {
    code: 'UNDERLINE',
    label: 'Underline'
  },
  strikethrough: {
    code: 'STRIKETHROUGH',
    label: 'Strikethrough'
  },
}

// Label and style name for block StyleButton components
const blockStyles = {
  quotes: {
    code: 'blockquote',
    label: 'Quotes'
  },
  code: {
    code: 'code-block',
    label: 'Code'
  },
  ul: {
    code: 'unordered-list-item',
    label: 'Ul'
  },
  ol: {
    code: 'ordered-list-item',
    label: 'Ol'
  },
}

export default StyleButton;
