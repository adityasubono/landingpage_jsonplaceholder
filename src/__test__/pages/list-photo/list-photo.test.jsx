/* eslint-env jest */
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useParams } from "react-router-dom";
import UserService from "../../../service/api/get-users.js";
import ListPhoto from "../../../pages/list-photo/list-photo.jsx";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn()
}));

jest.mock("../../../service/api/get-users.js");

describe('ListPhoto', () => {
    const mockPhotos = [
        { thumbnailUrl: "http://example.com/thumb1.jpg", url: "http://example.com/full1.jpg", title: "Photo 1" },
        { thumbnailUrl: "http://example.com/thumb2.jpg", url: "http://example.com/full2.jpg", title: "Photo 2" }
    ];

    beforeEach(() => {
        useParams.mockReturnValue({ albumId: '123' });
        UserService.getPhotoUserById.mockResolvedValue({ data: mockPhotos });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders and makes an API call based on albumId', async () => {
        render(<ListPhoto />);
        await waitFor(() => {
            expect(UserService.getPhotoUserById).toHaveBeenCalledWith('123');
        });
    });

    test('correctly handles no photos', async () => {
        UserService.getPhotoUserById.mockResolvedValueOnce({ data: [] });
        render(<ListPhoto />);

        await waitFor(() => {
            expect(screen.queryByRole('img')).toBeNull();
        });
    });
});
