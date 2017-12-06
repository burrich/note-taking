import React, { Component } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
// import Editor from 'draft-js-plugins-editor';
import Controls from './Controls';

import '../../../node_modules/draft-js/dist/Draft.css'; // TODO: move file outside node_modules
import './styles/default.css';

/**
 * RichTextEditor component implementating draft.js RTE editor.
 */
class RichTextEditor extends Component {
  constructor(props) {
    super(props);

    const note = this.props.note;
    const editorState = this.createContent(note);
    this.state = { editorState: editorState };

    // this methods binding
    this.onChange          = this.onChange.bind(this);
    this.onTab             = this.onTab.bind(this);
    this.focus             = this.focus.bind(this);
    this.handleKeyCommand  = this.handleKeyCommand.bind(this);
    this.handleSave        = this.handleSave.bind(this);
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
    this.toggleBlockStyle  = this.toggleBlockStyle.bind(this);
  }

  componentDidMount() {
    // this.focus();
  }

  componentWillReceiveProps(nextProps) {
    const nextNote = nextProps.note;
    if (!nextNote) {
      this.setState({ editorState: EditorState.createEmpty() });
      return;
    }

    const note = this.props.note;
    if (!note || nextNote.id !== note.id) {
      const editorState = this.createContent(nextNote);
      this.setState({ editorState: editorState });
    }
  }

  createContent(note) {
    const contentState = convertFromRaw(note);
    return EditorState.createWithContent(contentState); 
  }

  onChange(editorState) {  
    this.setState({ editorState });
  
    // const rawContent = convertToRaw(editorState.getCurrentContent());
    // console.log(JSON.stringify(rawContent, null, 2));
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

  getCurrentStyle() {
    const editorState = this.state.editorState;

    // get current editor inline style
    const currentInlineStyle = editorState.getCurrentInlineStyle();

    // get current editor block style
    const selection = editorState.getSelection(); 
    const currentBlockStyle = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return {
      inline: currentInlineStyle,
      block: currentBlockStyle
    };
  }

  handleSave() {
    const editorState = this.state.editorState;
    const rawContent = convertToRaw(editorState.getCurrentContent());
    const updatedNote = { 
      ...this.props.note, 
      ...rawContent
    };

    this.props.onSave(updatedNote);
  }

  render() {
    const editorState = this.state.editorState;
    const currentStyle = this.getCurrentStyle();
    const toggleStyle = {
      inline: this.toggleInlineStyle,
      block: this.toggleBlockStyle,
    };

    // if (!editorState) {
    //   return <div>LOADING...</div>;
    // }

    return (
      <div className="RichEditor-root">
        <Controls currentStyle={currentStyle}
                  toggleStyle={toggleStyle}
                  onSave={this.handleSave} />

        <div className="RichEditor-editor" onClick={this.focus}>
          <Editor editorState={editorState}
                  onChange={this.onChange}
                  handleKeyCommand={this.handleKeyCommand}
                  onTab={this.onTab}
                  blockStyleFn={getBlockStyle}
                  spellCheck={true}
                  ref={el => this.domEditor = el} />
                  {/*plugins={[]} />*/}
        </div>
      </div>
    );
  }
}

/**
 * Define CSS class to style blocks elements.
 */
function getBlockStyle(contentBlock) {
  const type = contentBlock.getType();
  if (type === 'blockquote') {
    return 'RichEditor-blockquote';
  }
}

export default RichTextEditor;
