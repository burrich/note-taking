import React from 'react';
import StyleButton from './StyleButton';

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

export default Controls;
