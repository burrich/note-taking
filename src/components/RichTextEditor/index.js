import React, { Component } from 'react';
import { EditorState, RichUtils } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import Controls from './Controls';

import '../../../node_modules/draft-js/dist/Draft.css'; // TODO: move file outside node_modules
import './styles/default.css';

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
    this.setState({ editorState });
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
 * Define CSS class to style blocks elements
 */
function getBlockStyle(contentBlock) {
  const type = contentBlock.getType();
  if (type === 'blockquote') {
    return 'RichEditor-blockquote';
  }
}

export default RichTextEditor;
