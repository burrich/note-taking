import React from 'react';
import { Button } from 'semantic-ui-react';
import InlineStyleButton from './InlineStyleButton';
import BlockStyleButton from './BlockStyleButton';

/**
 * Controls component container for StyleButton components.
 * TODO: return an array map
 * TODO: high order component instead of passing props like editorDisabled ?
 */
function Controls(props) {
  const inlineStyle       = props.currentStyle.inline;
  const blockStyle        = props.currentStyle.block;
  const toggleInlineStyle = props.toggleStyle.inline;
  const toggleBlockStyle  = props.toggleStyle.block;

  return (
    <div className="RichEditor-controls">
      <Button.Group>

        <InlineStyleButton 
          name="bold"
          editorStyle={inlineStyle}
          onToggle={toggleInlineStyle}
          disabled={props.editorDisabled} />

        <InlineStyleButton 
          name="italic"
          editorStyle={inlineStyle}
          onToggle={toggleInlineStyle}
          disabled={props.editorDisabled} />

        <InlineStyleButton 
          name="underline"
          editorStyle={inlineStyle}
          onToggle={toggleInlineStyle}
          disabled={props.editorDisabled} />

        <InlineStyleButton 
          name="strikethrough"
          editorStyle={inlineStyle}
          onToggle={toggleInlineStyle}
          disabled={props.editorDisabled} />
      </Button.Group>

      {' '}
      
      <Button.Group>
        <BlockStyleButton 
          name="quotes"
          editorStyle={blockStyle}
          onToggle={toggleBlockStyle}
          disabled={props.editorDisabled} />

        <BlockStyleButton 
          name="code"
          editorStyle={blockStyle}
          onToggle={toggleBlockStyle}
          disabled={props.editorDisabled} />

        <BlockStyleButton 
          name="ul"
          editorStyle={blockStyle}
          onToggle={toggleBlockStyle}
          disabled={props.editorDisabled} />

        <BlockStyleButton 
          name="ol"
          editorStyle={blockStyle}
          onToggle={toggleBlockStyle}
          disabled={props.editorDisabled} />

      </Button.Group>
    </div>
  );
}

export default Controls;
