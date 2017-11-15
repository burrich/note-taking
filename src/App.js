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

  toggleStyleUnderline() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  } 

  toggleStyleCode() {
    this.onChange(RichUtils.toggleCode(this.state.editorState));
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
            <span onMouseDown={this.toggleStyleBlock.bind(this)}
                  class="RichEditor-styleButton">
              Bold
            </span>
            <span onMouseDown={this.toggleStyleItalic.bind(this)}
                  class="RichEditor-styleButton">
              Italic
            </span>
            <span onMouseDown={this.toggleStyleUnderline.bind(this)}
                  class="RichEditor-styleButton">
              Underline
            </span>
            <span onMouseDown={this.toggleStyleCode.bind(this)}
                  class="RichEditor-styleButton">
              Code
            </span>
          </div>

          <div className="RichEditor-editor" onClick={this.focus}>
            <Editor editorState={this.state.editorState}
                    onChange={this.onChange}
                    handleKeyCommand={this.handleKeyCommand.bind(this)}
                    ref={el => this.domEditor = el} 
                    plugins={[]} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
