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
  
  toggleInlineStyle(styleCode) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, styleCode));
  }

  toggleBlockStyle(styleCode) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, styleCode));
  }

  render() {
    const editorState = this.state.editorState;

    return (
      <div className="RichEditor-root">
        <Controls editorState={editorState}
                  toggleInlineStyle={this.toggleInlineStyle}
                  toggleBlockStyle={this.toggleBlockStyle} />

        <div className="RichEditor-editor" onClick={this.focus}>
          <Editor editorState={editorState}
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
  const editorState = props.editorState;

  // get current editor inline style
  const currentInlineStyle = props.editorState.getCurrentInlineStyle();

  // get current editor block style
  const selection = editorState.getSelection(); 
  const currentBlockStyle = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      <StyleButton name="bold"
                   type="inline"
                   editorStyle={currentInlineStyle}
                   onToggle={props.toggleInlineStyle} />

      <StyleButton name="italic"
                   type="inline"
                   editorStyle={currentInlineStyle}
                   onToggle={props.toggleInlineStyle} />

      <StyleButton name="underline"
                   type="inline"
                   editorStyle={currentInlineStyle}
                   onToggle={props.toggleInlineStyle} />

      <StyleButton name="strikethrough"
                   type="inline"
                   editorStyle={currentInlineStyle}
                   onToggle={props.toggleInlineStyle} />

      <StyleButton name="quotes"
                   type="block"
                   editorStyle={currentBlockStyle}
                   onToggle={props.toggleBlockStyle} />

      <StyleButton name="code"
                   type="block"
                   editorStyle={currentBlockStyle}
                   onToggle={props.toggleBlockStyle} />

      <StyleButton name="ul"
                   type="block"
                   editorStyle={currentBlockStyle}
                   onToggle={props.toggleBlockStyle} />

      <StyleButton name="ol"
                   type="block"
                   editorStyle={currentBlockStyle}
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
