/* eslint-env jest */
import { shallow } from 'enzyme';
import { MdEmail } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import UserCard from "../../../components/user-card/user-card.jsx";
import Button from "../../../components/button/button.jsx";

describe('UserCard component', () => {
    const props = {
        name: 'John Doe',
        email: 'john@example.com',
        buttonFunction: jest.fn(),
        value: 123,
    };

    it('renders correctly', () => {
        const wrapper = shallow(<UserCard {...props} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('displays name correctly', () => {
        const wrapper = shallow(<UserCard {...props} />);
        const nameParagraph = wrapper.find('.card__name');
        expect(nameParagraph).toHaveLength(1);
        expect(nameParagraph.find(FaUser)).toHaveLength(1);
        const textWithoutIcon = nameParagraph.text().replace('<FaUser />', '').trim();
        expect(textWithoutIcon).toEqual('John Doe');
    });

    it('displays email correctly', () => {
        const wrapper = shallow(<UserCard {...props} />);
        const emailParagraph = wrapper.find('.card__email');
        expect(emailParagraph).toHaveLength(1);

        expect(emailParagraph.find(MdEmail)).toHaveLength(1);

        const textWithoutIcon = emailParagraph.text().replace('<MdEmail />', '').trim();
        expect(textWithoutIcon).toEqual('john@example.com');
    });


    it('displays User Posts link correctly', () => {
        const wrapper = shallow(<UserCard {...props} />);
        const link = wrapper.find(Link);
        expect(link.prop('to')).toEqual('user/123/posts');
        expect(link.text().trim()).toEqual('User Posts');
    });

    it('displays FaUser icon', () => {
        const wrapper = shallow(<UserCard {...props} />);
        expect(wrapper.find(FaUser)).toHaveLength(1);
    });

    it('displays MdEmail icon', () => {
        const wrapper = shallow(<UserCard {...props} />);
        expect(wrapper.find(MdEmail)).toHaveLength(1);
    });

    it('passes correct props to Button component', () => {
        const wrapper = shallow(<UserCard {...props} />);
        const button = wrapper.find(Button);
        expect(button.prop('buttonFunction')).toEqual(props.buttonFunction);
        expect(button.prop('text')).toEqual('More Info');
        expect(button.prop('value')).toEqual(123);
    });

    it('renders Button component with correct buttonFunction prop', () => {
        const wrapper = shallow(<UserCard {...props} />);
        const button = wrapper.find(Button);
        expect(button.exists()).toBe(true);
        expect(button.prop('buttonFunction')).toEqual(props.buttonFunction);
    });
});
