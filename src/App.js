import React, {Component} from 'react';
import {EditorState, RichUtils} from 'draft-js';
import Editor from 'draft-js-plugins-editor';

import '../node_modules/draft-js/dist/Draft.css'; // TODO: move file outside node_modules
import './App.css'; // TODO: rename file

/**
 * Draft RTE editor component class
 *
 * TODO: rename App
 * TODO: methods comments
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };

    this.onChange = (editorState) => this.setState({editorState});
    this.focus    = () => this.domEditor.focus();
  }

  componentDidMount() {
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
  
  toggleStyleBlock(e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  toggleStyleItalic(e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }

  toggleStyleUnderline(e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }

  toggleStyleStrikethrough(e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'STRIKETHROUGH'));
  }

  toggleStyleBlockquote(e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'blockquote'));
  }

  toggleStyleCode(e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'code-block'));
  }

  toggleStyleUl(e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'unordered-list-item'));
  }

  toggleStyleOl(e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'ordered-list-item'));
  }

  onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  render() {
    // TODO: move h1 outside this component 
    return (
      <div className="App">
        <div className="RichEditor-header">
          <h1>Note taking</h1>
        </div>

        <div className="RichEditor-root">
          <div className="RichEditor-controls">
            <span className="RichEditor-styleButton"
                  onMouseDown={this.toggleStyleBlock.bind(this)}>
              Bold
            </span>
            <span className="RichEditor-styleButton"
                  onMouseDown={this.toggleStyleItalic.bind(this)}>
              Italic
            </span>
            <span className="RichEditor-styleButton"
                  onMouseDown={this.toggleStyleUnderline.bind(this)}>
              Underline
            </span>
            <span className="RichEditor-styleButton"
                  onMouseDown={this.toggleStyleStrikethrough.bind(this)}>
              Strikethrough
            </span>
            <span className="RichEditor-styleButton"
                  onMouseDown={this.toggleStyleBlockquote.bind(this)}>
              Blockquote
            </span>
            <span className="RichEditor-styleButton"
                  onMouseDown={this.toggleStyleCode.bind(this)}>
              Code
            </span>
            <span className="RichEditor-styleButton"
                  onMouseDown={this.toggleStyleUl.bind(this)}>
              Ul
            </span>
            <span className="RichEditor-styleButton"
                  onMouseDown={this.toggleStyleOl.bind(this)}>
              Ol
            </span>
          </div>

          <div className="RichEditor-editor" onClick={this.focus}>
            <Editor editorState={this.state.editorState}
                    onChange={this.onChange}
                    handleKeyCommand={this.handleKeyCommand.bind(this)}
                    onTab={this.onTab.bind(this)}
                    blockStyleFn={getBlockStyle}
                    spellCheck={true}
                    ref={el => this.domEditor = el} 
                    plugins={[]} />
          </div>
        </div>
      </div>
    );
  }
}

function getBlockStyle(contentBlock) {
  const type = contentBlock.getType();
  if (type === 'blockquote') {
    return 'RichEditor-blockquote';
  }
}

export default App;
