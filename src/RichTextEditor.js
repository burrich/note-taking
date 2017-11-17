import React, {Component} from 'react';
import {EditorState, RichUtils} from 'draft-js';
import Editor from 'draft-js-plugins-editor';

import '../node_modules/draft-js/dist/Draft.css'; // TODO: move file outside node_modules
import './RichTextEditor.css';

/**
 * RichTextEditor component implementating draft.js RTE editor.
 */
class RichTextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };

    // this methods binding
    this.onChange          = this.onChange.bind(this);
    this.onTab             = this.onTab.bind(this);
    this.focus             = this.focus.bind(this);
    this.handleKeyCommand  = this.handleKeyCommand.bind(this);
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
    this.toggleBlockStyle  = this.toggleBlockStyle.bind(this);
  }

  componentDidMount() {
    this.focus();
  }

  onChange(editorState) {
    this.setState({editorState});
  }

  onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  focus() {
    this.domEditor.focus();
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  
  toggleInlineStyle(style) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style));
  }

  toggleBlockStyle(style) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, style));
  }

  render() {
    return (
      <div className="RichEditor-root">
        <Controls toggleInlineStyle={this.toggleInlineStyle}
                  toggleBlockStyle={this.toggleBlockStyle} />

        <div className="RichEditor-editor" onClick={this.focus}>
          <Editor editorState={this.state.editorState}
                  onChange={this.onChange}
                  handleKeyCommand={this.handleKeyCommand}
                  onTab={this.onTab}
                  blockStyleFn={getBlockStyle}
                  spellCheck={true}
                  ref={el => this.domEditor = el} 
                  plugins={[]} />
        </div>
      </div>
    );
  }
}

/**
 * Controls component container for StyleButton components.
 */
function Controls(props) {
  return (
    <div className="RichEditor-controls">
      <StyleButton name="bold"
                   type="inline"
                   onToggle={props.toggleInlineStyle} />

      <StyleButton name="italic"
                   type="inline"
                   onToggle={props.toggleInlineStyle} />

      <StyleButton name="underline"
                   type="inline"
                   onToggle={props.toggleInlineStyle} />

      <StyleButton name="strikethrough"
                   type="inline"
                   onToggle={props.toggleInlineStyle} />

      <StyleButton name="quotes"
                   type="block"
                   onToggle={props.toggleBlockStyle} />

      <StyleButton name="code"
                   type="block"
                   onToggle={props.toggleBlockStyle} />

      <StyleButton name="ul"
                   type="block"
                   onToggle={props.toggleBlockStyle} />

      <StyleButton name="ol"
                   type="block"
                   onToggle={props.toggleBlockStyle} />
    </div>
  );
}

/**
 * StyleButton component which can be inline or block (props.type).
 */
class StyleButton extends Component {
  constructor(props) {
    super(props);
    this.styles = (this.props.type === 'inline') ? inlineStyles : blockStyles ;

    // this methods binding
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(e) {
    e.preventDefault();

    const onToggle  = this.props.onToggle;
    const name = this.props.name;
    onToggle(this.styles[name].style);
  }

  render() {
    const label = this.styles[this.props.name].label;

    return(
      <span className="RichEditor-styleButton"
            onMouseDown={this.onToggle}>
        {label}
      </span>
    );
  }
}

// Label and style name for inline StyleButton components
const inlineStyles = {
  bold: {
    label: 'Bold',
    style: 'BOLD'
  },
  italic: {
    label: 'Italic',
    style: 'ITALIC'
  },
  underline: {
    label: 'Underline',
    style: 'UNDERLINE'
  },
  strikethrough: {
    label: 'Strikethrough',
    style: 'STRIKETHROUGH'
  },
}

// Label and style name for block StyleButton components
const blockStyles = {
  quotes: {
    label: 'Quotes',
    style: 'blockquote'
  },
  code: {
    label: 'Code',
    style: 'code-block'
  },
  ul: {
    label: 'Ul',
    style: 'unordered-list-item'
  },
  ol: {
    label: 'Ol',
    style: 'ordered-list-item'
  },
}

/**
 * Define CSS class to style blocks elements
 */
function getBlockStyle(contentBlock) {
  const type = contentBlock.getType();
  if (type === 'blockquote') {
    return 'RichEditor-blockquote';
  }
}

export default RichTextEditor;
