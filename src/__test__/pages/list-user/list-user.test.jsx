/* eslint-env jest */
import { shallow } from 'enzyme';
import ListUser from "../../../pages/list-user/list-user.jsx";
import { Link } from 'react-router-dom';

describe('ListUser component', () => {
    it('renders a Link with correct props', () => {
        const id = '123';
        const name = 'John Doe';
        const wrapper = shallow(<ListUser id={id} name={name} />);
        const link = wrapper.find(Link);

        expect(link).toHaveLength(1);
        expect(link.prop('to')).toEqual(`user/${id}/posts`);
        expect(link.text()).toEqual(name);
    });

    it('renders a list item', () => {
        const id = '123';
        const name = 'John Doe';
        const wrapper = shallow(<ListUser id={id} name={name} />);
        const listItem = wrapper.find('li');

        expect(listItem).toHaveLength(1);
        expect(listItem.find(Link)).toHaveLength(1);
    });

    it('matches snapshot', () => {
        const id = '123';
        const name = 'John Doe';
        const wrapper = shallow(<ListUser id={id} name={name} />);
        expect(wrapper).toMatchSnapshot();
    });
});
