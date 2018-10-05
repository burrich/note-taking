import React, { Component } from 'react';
import { Editor, EditorState, ContentState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
// import Editor from 'draft-js-plugins-editor';
import _ from 'lodash';

import '../../../node_modules/draft-js/dist/Draft.css'; // TODO: move file outside node_modules
import './styles/default.css';

import Controls from './Controls';

const LOG_TAG = '[RichTextEditor]';

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

    this.domEditor = React.createRef();

    // this methods binding
    this.onChange          = this.onChange.bind(this);
    this.onTab             = this.onTab.bind(this);
    this.onFocus           = this.onFocus.bind(this);
    this.onBlur            = this.onBlur.bind(this);
    this.focus             = this.focus.bind(this);
    this.handleKeyCommand  = this.handleKeyCommand.bind(this);
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
    this.toggleBlockStyle  = this.toggleBlockStyle.bind(this);
  }

  componentDidMount() {
    console.log(LOG_TAG, 'componentDidMount()');
    if (this.props.isFocus) {
      window.requestAnimationFrame(() => {
        console.log(LOG_TAG, 'focus');
        this.focus();
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(LOG_TAG, 'componentDidUpdate()');
    // Auto-save
    if (!this.props.disabled) {
      this.handleAutoSave(prevProps, prevState);
    }

    // Focus
    if (!prevProps.isFocus && this.props.isFocus) {
      // this.focus();
    }
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

  onFocus(e) {
    if (!this.props.isFocus) {
      this.props.onFocus();
    }
  }

  onBlur(e) {
    if (this.props.isFocus) {
      this.props.onBlur();
    }
  }

  // TODO: better way to define the debounce method
  onUpdateContent = _.debounce((updatedNote) => {
    this.props.onSave(updatedNote);
  }, 1000);
  
  handleAutoSave(prevProps, prevState) {
    const previousRawContent = convertToRaw(prevState.editorState.getCurrentContent());
    const currentRawContent  = convertToRaw(this.state.editorState.getCurrentContent());
    // console.log('previousRawContent', previousRawContent);
    // console.log('currentRawContent', currentRawContent);

    const currentNote = this.props.note;
    const isContentUpdated = !_.isEqual(previousRawContent, currentRawContent);
    const hasNoteChanged = (currentNote !== prevProps.note) ? true : false;

    if (isContentUpdated && !hasNoteChanged) {
      const updatedNote = {
        ...currentNote,
        ...currentRawContent
      }
      console.log(LOG_TAG, 'onUpdateContent');
      this.onUpdateContent(updatedNote);
    }
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  createContent(note) {
    if (!note) {
      const defaultContent = ContentState.createFromText(
        'First you must add a note on the left side panel.'
      );
      return EditorState.createWithContent(defaultContent);
    }

    const contentState = convertFromRaw(note);
    const editorState = EditorState.createWithContent(contentState);
    return EditorState.moveSelectionToEnd(editorState); 
  }

  focus() {
    this.domEditor.current.focus();
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
  
  toggleInlineStyle(styleCode) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, styleCode));
  }

  toggleBlockStyle(styleCode) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, styleCode));
  }

  render() {
    console.log(LOG_TAG, 'render()');

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
                  toggleStyle={toggleStyle}
                  editorDisabled={this.props.disabled} />

        <div className={editorWrapperClass} onClick={this.focus}>
          <Editor editorState={editorState}
                  onChange={this.onChange}
                  handleKeyCommand={this.handleKeyCommand}
                  onTab={this.onTab}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                  blockStyleFn={getBlockStyle}
                  spellCheck={true}
                  readOnly={readOnly}
                  ref={this.domEditor} />
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
