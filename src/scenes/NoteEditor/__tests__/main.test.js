import React from 'react';
import { shallow } from 'enzyme'
import NoteEditor from '../';

jest.mock('../../../services/clientStorageApi');

test('NoteEditor renders correctly with notes', () => {
  const noteEditor = shallow(<NoteEditor />);
  expect(noteEditor).toMatchSnapshot();
});
