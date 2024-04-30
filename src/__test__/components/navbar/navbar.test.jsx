/* eslint-env jest */
import { shallow } from 'enzyme';
import Navbar from "../../../components/navbar/navbar.jsx";

describe('Navbar Component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Navbar />);
    });

    it('renders without crashing', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('renders logo correctly', () => {
        const logo = wrapper.find('.logo');
        expect(logo.exists()).toBe(true);
        expect(logo.text()).toEqual('JSONPlaceholder.');
    });

    it('renders search form correctly', () => {
        const searchForm = wrapper.find('.search-form');
        expect(searchForm.exists()).toBe(true);
        const input = searchForm.find('input[type="text"]');
        expect(input.exists()).toBe(true);
        expect(input.prop('placeholder')).toEqual('Search...');
        const searchIcon = searchForm.find('.bi-search');
        expect(searchIcon.exists()).toBe(true);
    });
});
