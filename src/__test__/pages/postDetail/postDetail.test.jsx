/* eslint-env jest */
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For DOM assertions
import { Comments } from '../../../pages/postDetail/postDetail.jsx';
import PostCommentsService from "../../../service/api/get-post-comments.js";

// Mocking the service APIs
jest.mock('../../../service/api/get-posts');
jest.mock('../../../service/api/get-post-comments');

describe('Comments Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('displays modal for adding a new comment', async () => {
        const { getAllByText } = render(<Comments postId={1} />);
        fireEvent.click(getAllByText('New Comment')[0]);
        await waitFor(() => {
            expect(getAllByText('New Comment')[0]).toBeInTheDocument();
        });
    });

    test('displays text email', async () => {
        const { getAllByLabelText, getAllByText } = render(<Comments postId={1} />);

        fireEvent.click(getAllByText('New Comment')[0]);

        await waitFor(() => {
            expect(getAllByText('New Comment')[0]).toBeInTheDocument();
        });
        fireEvent.change(getAllByLabelText('E-mail:')[0]);
    });

    test('adds a new comment', async () => {
        const { getAllByText } = render(<Comments postId={1} />);

        PostCommentsService.addPostComments.mockResolvedValue({
            data: {
                postId: 1,
                id: 2,
                name: 'Jane Doe',
                email: 'jane@example.com',
                body: 'Another test comment',
            },
        });

        fireEvent.click(getAllByText('New Comment')[0]);
        await waitFor(() => {
            expect(getAllByText('New Comment')[0]).toBeInTheDocument();
        });
    });
});
