import React from 'react';
import { shallow } from 'enzyme';
import InlineStyleButton from '../InlineStyleButton';

const buttonStyle = {
  name: 'bold',
  code: 'BOLD'
};
const inlineStyle = new Map();
const toggleInlineStyle = jest.fn();

test('Inative inline style button renders correctly', () => {
  const button = shallow(
    <InlineStyleButton name={buttonStyle.name}
                       editorStyle={inlineStyle}
                       onToggle={toggleInlineStyle} />
  );
  expect(button).toMatchSnapshot();
});

test('Active inline style button renders correctly', () => {
  inlineStyle.set(buttonStyle.code, buttonStyle.code);

  const button = shallow(
    <InlineStyleButton name={buttonStyle.name}
                       editorStyle={inlineStyle}
                       onToggle={toggleInlineStyle} />
  );
  expect(button).toMatchSnapshot();
});