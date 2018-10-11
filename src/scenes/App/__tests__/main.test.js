import React from 'react';
import { shallow } from 'enzyme'
import App from '../';

jest.mock('../../../services/clientStorageApi');

test('App renders correctly with notes', () => {
  const app = shallow(<App />);
  expect(app).toMatchSnapshot();
});
