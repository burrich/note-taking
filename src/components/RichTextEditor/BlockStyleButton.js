import React from 'react';
import StyleButton from './StyleButton';

import './styles/style-button.css';

/**
 * BlockStyleButton component.
 */
function BlockStyleButton(props) {
  const style = styles[props.name];
  const active = props.editorStyle === style.code;
  
  return (
    <StyleButton style={style}
                 active={active}
                 onToggle={props.onToggle} />
  );
}

const styles = {
  quotes: {
    code: 'blockquote',
    label: 'Quotes'
  },
  code: {
    code: 'code-block',
    label: 'Code'
  },
  ul: {
    code: 'unordered-list-item',
    label: 'Ul'
  },
  ol: {
    code: 'ordered-list-item',
    label: 'Ol'
  },
}

export default BlockStyleButton;
