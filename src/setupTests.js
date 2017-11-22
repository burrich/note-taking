import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Setup enzyme's react adapter for react-scripts test
configure({ adapter: new Adapter() });