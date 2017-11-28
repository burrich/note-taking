import React from 'react';
import { shallow } from 'enzyme';
import BlockStyleButton from '../BlockStyleButton';

const buttonStyle = {
  name: 'code',
  code: 'code-block'
};
const toggleBlockStyle = jest.fn();
let blockStyle = '';

test('Inative inline style button renders correctly', () => {
  const button = shallow(
    <BlockStyleButton name={buttonStyle.name}
                      editorStyle={blockStyle}
                      onToggle={toggleBlockStyle} />
  );
  expect(button).toMatchSnapshot();
});

test('Active inline style button renders correctly', () => {
  blockStyle = 'code-block';

  const button = shallow(
    <BlockStyleButton name={buttonStyle.name}
                      editorStyle={blockStyle}
                      onToggle={toggleBlockStyle} />
  );
  expect(button).toMatchSnapshot();
});