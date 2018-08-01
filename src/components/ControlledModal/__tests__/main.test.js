import React from 'react';
import { shallow } from 'enzyme'

import ControlledModal from '../';

test('Controlled modal renders correctly', () => {
  const modal = shallow(
    <ControlledModal
      open={true}
      onClose={jest.fn()}
      size="mini"
      header="controlled modal"
      content="modal content"
      modalActions="modal action" />
  );
  expect(modal).toMatchSnapshot();
});