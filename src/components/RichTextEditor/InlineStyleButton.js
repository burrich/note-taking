import React from 'react';
import StyleButton from './StyleButton';

import './styles/style-button.css';

/**
 * InlineStyleButton component.
 */
function InlineStyleButton(props) {
  const style = styles[props.name];
  const active = props.editorStyle.has(style.code);
  
  return (
    <StyleButton style={style}
                 active={active}
                 onToggle={props.onToggle} />
  );
}

const styles = {
  bold: {
    code: 'BOLD',
    label: 'Bold'
  },
  italic: {
    code: 'ITALIC',
    label: 'Italic'
  },
  underline: {
    code: 'UNDERLINE',
    label: 'Underline'
  },
  strikethrough: {
    code: 'STRIKETHROUGH',
    label: 'Strikethrough'
  },
}

export default InlineStyleButton;
