/* eslint-env jest */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from "../../../pages/home/home.jsx";
import UserService from "../../../service/api/get-users.js";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../../service/api/get-users.js");

describe('Home component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', async () => {
        UserService.getUsers.mockResolvedValueOnce({ data: [] });
        render(<BrowserRouter><Home /></BrowserRouter>);
        expect(screen.getByText(/List User/i)).toBeInTheDocument();
    });

    it('displays users after fetching', async () => {
        const mockUserData = {
            data: [
                { id: 1, name: 'John Doe', email: 'johndoe@example.com', address: { street: '123 Main St', suite: 'Apt 1', city: 'Anytown', zipcode: '12345' } },
            ]
        };
        UserService.getUsers.mockResolvedValueOnce(mockUserData);
        render(<BrowserRouter><Home /></BrowserRouter>);

        expect(await screen.findByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('johndoe@example.com')).toBeInTheDocument();
        expect(screen.getByText('123 Main St, Apt 1, Anytown, 12345')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /User Posts »/i })).toHaveAttribute('href', '/user/1/posts');
    });

    it('displays different user images', async () => {
        const mockUserData = {
            data: [
                { id: 1, name: 'Jane Doe', email: 'janedoe@example.com', address: { street: '456 Elm St', suite: 'Apt 2', city: 'Differenttown', zipcode: '67890' } },
            ]
        };
        UserService.getUsers.mockResolvedValueOnce(mockUserData);
        render(<BrowserRouter><Home /></BrowserRouter>);

        const image = await screen.findByAltText('Image');
        expect(image.src).toMatch(/https:\/\/randomuser.me\/api\/portraits\/(men|women)\/[0-9]+.jpg/);
    });

    it('renders multiple users from the API', async () => {
        const mockUserData = {
            data: [
                { id: 2, name: 'Jane Doe', email: 'janedoe@example.com', address: { street: '789 Oak St', suite: 'Apt 3', city: 'Townton', zipcode: '10112' } },
                { id: 3, name: 'Jim Poe', email: 'jimpoe@example.com', address: { street: '101 Pine St', suite: 'Apt 4', city: 'Smalltown', zipcode: '13145' } }
            ]
        };
        UserService.getUsers.mockResolvedValueOnce(mockUserData);
        render(<BrowserRouter><Home /></BrowserRouter>);

        expect(await screen.findByText('Jane Doe')).toBeInTheDocument();
        expect(screen.getByText('Jim Poe')).toBeInTheDocument();
        expect(screen.getAllByText(/User Posts »/i).length).toEqual(2);
    });

    it('calls retrieveUser and updates user state', async () => {
        const mockUserData = {
            data: [
                { id: 1, name: 'John Doe', email: 'johndoe@example.com', address: { street: '123 Main St', suite: 'Apt 1', city: 'Anytown', zipcode: '12345' } },
            ]
        };
        UserService.getUsers.mockResolvedValueOnce(mockUserData);
        render(<BrowserRouter><Home /></BrowserRouter>);

        await screen.findByText('John Doe');

        expect(UserService.getUsers).toHaveBeenCalled();

        // Check if the user state is updated with the fetched data
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('johndoe@example.com')).toBeInTheDocument();
        expect(screen.getByText('123 Main St, Apt 1, Anytown, 12345')).toBeInTheDocument();
    });
});
