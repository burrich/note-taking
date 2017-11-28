import React from 'react';
import InlineStyleButton from './InlineStyleButton';
import BlockStyleButton from './BlockStyleButton';

/**
 * Controls component container for StyleButton components.
 * TODO: return an array map
 */
function Controls(props) {
  const inlineStyle       = props.currentStyle.inline;
  const blockStyle        = props.currentStyle.block;
  const toggleInlineStyle = props.toggleStyle.inline;
  const toggleBlockStyle  = props.toggleStyle.block;

  return (
    <div className="RichEditor-controls">
      <InlineStyleButton name="bold"
                         editorStyle={inlineStyle}
                         onToggle={toggleInlineStyle} />

      <InlineStyleButton name="italic"
                         editorStyle={inlineStyle}
                         onToggle={toggleInlineStyle} />

      <InlineStyleButton name="underline"
                         editorStyle={inlineStyle}
                         onToggle={toggleInlineStyle} />

      <InlineStyleButton name="strikethrough"
                         editorStyle={inlineStyle}
                         onToggle={toggleInlineStyle} />

      <BlockStyleButton name="quotes"
                        editorStyle={blockStyle}
                        onToggle={toggleBlockStyle} />

      <BlockStyleButton name="code"
                        editorStyle={blockStyle}
                        onToggle={toggleBlockStyle} />

      <BlockStyleButton name="ul"
                        editorStyle={blockStyle}
                        onToggle={toggleBlockStyle} />

      <BlockStyleButton name="ol"
                        editorStyle={blockStyle}
                        onToggle={toggleBlockStyle} />
    </div>
  );
}

export default Controls;
