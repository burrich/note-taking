import React from 'react';
import { shallow } from 'enzyme'
import App from '../';
import RichTextEditor from '../../../components/RichTextEditor';

test('find one RichTextEditor', () => {
  const app = shallow(<App />);
  expect(app.find(RichTextEditor)).toHaveLength(1);
});
