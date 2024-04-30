/* eslint-env jest */
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Modal from "../../../components/modal/modal.jsx"; // for better assertions

describe('Modal Component', () => {
    it('renders nothing when theModalIsOpen is false', () => {
        const { container } = render(<Modal theModalIsOpen={false} />);
        expect(container.firstChild).toBeNull();
    });

    it('renders modal content when theModalIsOpen is true', () => {
        const { getByText } = render(
            <Modal theModalIsOpen={true}>
                <div>Modal Content</div>
            </Modal>
        );
        expect(getByText('Modal Content')).toBeInTheDocument();
    });

    it('calls buttonFunction when the modal background is clicked', () => {
        const buttonFunction = jest.fn();
        const { getByTestId } = render(
            <Modal theModalIsOpen={true} buttonFunction={buttonFunction}>
                <div>Modal Content</div>
            </Modal>
        );
        fireEvent.click(getByTestId('modal-background'));
        expect(buttonFunction).toHaveBeenCalledTimes(1);
    });

    it('calls buttonFunction when the Close button is clicked', () => {
        const buttonFunction = jest.fn();
        const { getByText } = render(
            <Modal theModalIsOpen={true} buttonFunction={buttonFunction}>
                <div>Modal Content</div>
            </Modal>
        );
        fireEvent.click(getByText('Close'));
        expect(buttonFunction).toHaveBeenCalledTimes(1);
    });
});
