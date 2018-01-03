import React from 'react';
import StyleButton from './StyleButton';

/**
 * BlockStyleButton component.
 */
function BlockStyleButton(props) {
  const style = styles[props.name];
  const active = props.editorStyle === style.code;
  
  return (
    <StyleButton 
      style={style}
      active={active}
      onToggle={props.onToggle}
      disabled={props.disabled} />
  );
}

const styles = {
  quotes: {
    code: 'blockquote',
    name: 'quote right'
  },
  code: {
    code: 'code-block',
    name: 'code'
  },
  ul: {
    code: 'unordered-list-item',
    name: 'unordered list'
  },
  ol: {
    code: 'ordered-list-item',
    name: 'ordered list'
  },
}

export default BlockStyleButton;
