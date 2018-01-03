import React from 'react';
import StyleButton from './StyleButton';

/**
 * InlineStyleButton component.
 */
function InlineStyleButton(props) {
  const style = styles[props.name];
  const active = props.editorStyle.has(style.code);
  
  return (
    <StyleButton 
      style={style}
      active={active}
      onToggle={props.onToggle}
      disabled={props.disabled} />
  );
}

// code for draft and name for semantic ui icons
const styles = {
  bold: {
    code: 'BOLD',
    name: 'bold'
  },
  italic: {
    code: 'ITALIC',
    name: 'italic'
  },
  underline: {
    code: 'UNDERLINE',
    name: 'underline'
  },
  strikethrough: {
    code: 'STRIKETHROUGH',
    name: 'strikethrough'
  },
}

export default InlineStyleButton;
