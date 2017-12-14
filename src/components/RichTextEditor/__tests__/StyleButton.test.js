import React from 'react';
import { shallow } from 'enzyme';
import StyleButton from '../StyleButton';

const style = {
  code: 'BOLD',
  name: 'bold'
};
const onToggle = jest.fn();

test('Inactive style button renders correctly', () => {
  const button = shallow(
    <StyleButton 
      style={style}
      active={false}
      onToggle={onToggle} />
  );
  expect(button).toMatchSnapshot();
});

test('Active style button renders correctly', () => {
  const button = shallow(
    <StyleButton 
      style={style}
      active={true}
      onToggle={onToggle} />
  );
  expect(button).toMatchSnapshot();
});
