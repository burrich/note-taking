import React, { Component } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
// import Editor from 'draft-js-plugins-editor';
import _ from 'lodash';

import '../../../node_modules/draft-js/dist/Draft.css'; // TODO: move file outside node_modules
import './styles/default.css';

import Controls from './Controls';

/**
 * RichTextEditor component implementating draft.js RTE editor.
 * TODO: reafacto contructor, willReceive and createContent
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
    if (!note || nextNote._id !== note._id) {
      const editorState = this.createContent(nextNote);
      this.setState({ editorState: editorState });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.handleAutoSave(prevProps, prevState);    
  }

  handleAutoSave(prevProps, prevState) {
    const previousRawContent = convertToRaw(prevState.editorState.getCurrentContent());
    const currentRawContent  = convertToRaw(this.state.editorState.getCurrentContent());

    const currentNote = this.props.note;
    const isContentUpdated = !_.isEqual(previousRawContent, currentRawContent);
    const hasNoteChanged = (currentNote !== prevProps.note) ? true : false;

    if (isContentUpdated && !hasNoteChanged) {
      const updatedNote = {
        ...currentNote,
        ...currentRawContent
      }
      this.onUpdateContent(updatedNote);
    }
  }

  // TODO: better way to define the debounce method
  onUpdateContent = _.debounce((updatedNote) => {
    this.props.onSave(updatedNote);
  }, 1000);

  createContent(note) {
    if (!note) {
      return EditorState.createEmpty();
    }

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

  render() {
    const editorState = this.state.editorState;
    const currentStyle = this.getCurrentStyle();
    const toggleStyle = {
      inline: this.toggleInlineStyle,
      block: this.toggleBlockStyle,
    };

    // TODO: state
    const readOnly = this.props.note ? false : true;
    let editorWrapperClass = 'RichEditor-editor';
    editorWrapperClass += !this.props.note ? ' RichEditor-editor-disabled' : '';

    return (
      <div className="RichEditor-root">
        <Controls currentStyle={currentStyle}
                  toggleStyle={toggleStyle} />

        <div className={editorWrapperClass} onClick={this.focus}>
          <Editor editorState={editorState}
                  onChange={this.onChange}
                  handleKeyCommand={this.handleKeyCommand}
                  onTab={this.onTab}
                  blockStyleFn={getBlockStyle}
                  spellCheck={true}
                  readOnly={readOnly}
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
