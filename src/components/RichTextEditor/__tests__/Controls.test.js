import React from 'react';
import { shallow } from 'enzyme';
import Controls from '../Controls';

test('Controls render correctly', () => {
  const currentStyle = {
    inline: new Map(),
    block: ''
  };
  const toggleStyle = {
    inline: jest.fn(),
    block: jest.fn()
  };

  const controls = shallow(
    <Controls currentStyle={currentStyle}
              toggleStyle={toggleStyle} />
  );
  expect(controls).toMatchSnapshot();
  // expect(controls.find(StyleButton)).toHaveLength(8);
});
