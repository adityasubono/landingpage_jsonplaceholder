/* eslint-env jest */
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListUserInformation from "../../../components/list-user-information/list-user-information.jsx";

describe('ListUserInformation Component', () => {
    const userInfo = {
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        phone: '123-456-7890',
        website: 'www.example.com',
        company: {
            name: 'Example Company'
        },
        address: {
            street: '123 Main St',
            suite: 'Apt 101',
            city: 'City',
            zipcode: '12345'
        }
    };

    it('renders user information correctly', () => {
        const { getByText } = render(<ListUserInformation userInfo={userInfo} />);

        expect(getByText(userInfo.name)).toBeInTheDocument();
        expect(getByText(userInfo.username)).toBeInTheDocument();
        expect(getByText(userInfo.email)).toBeInTheDocument();
        expect(getByText(userInfo.phone)).toBeInTheDocument();
        expect(getByText(userInfo.website)).toBeInTheDocument();
        expect(getByText(userInfo.company.name)).toBeInTheDocument();
        expect(getByText(userInfo.address.street, { exact: false })).toBeInTheDocument();
        expect(getByText(userInfo.address.suite, { exact: false })).toBeInTheDocument();
        expect(getByText(userInfo.address.city, { exact: false })).toBeInTheDocument();
        expect(getByText(userInfo.address.zipcode, { exact: false })).toBeInTheDocument();
    });
});
