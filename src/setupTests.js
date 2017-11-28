import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';

/*
 * This file allows Jest configuration when using react-scripts.
 * Wihout react-scripts, configuration should be done inside package.json.
 */

// Setup enzyme's react adapter
configure({ adapter: new Adapter() });

// Add snapshot serializer in order to match snapshot (toMatchSnapshot() from Jest) with Enzyme objects
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));