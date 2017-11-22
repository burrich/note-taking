import React from 'react';
// import ReactDOM from 'react-dom';
import { shallow } from 'enzyme'

import App from '../App';
import RichTextEditor from '../RichTextEditor';

test('find one RichTextEditor', () => {
  const app = shallow(<App />);
  expect(app.find(RichTextEditor)).toHaveLength(1);
});
