/* eslint-env jest */
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Button from "../../../components/button/button.jsx";

describe('Button Component', () => {
    it('renders button text correctly', () => {
        const buttonText = 'Click Me';
        const { getByText } = render(<Button text={buttonText} />);
        expect(getByText(buttonText)).toBeInTheDocument();
    });

    it('calls buttonFunction when clicked', () => {
        const buttonFunction = jest.fn();
        const { getByText } = render(<Button text="Click Me" buttonFunction={buttonFunction} />);
        fireEvent.click(getByText('Click Me'));
        expect(buttonFunction).toHaveBeenCalledTimes(1);
    });

    it('renders additional props correctly', () => {
        const buttonClass = 'custom-button';
        const { getByTestId } = render(<Button text="Click Me" data-testid="custom-button" className={buttonClass} />);
        const button = getByTestId('custom-button');
        expect(button).toHaveClass(buttonClass);
    });
    it('renders with default props if not provided', () => {
        const { queryByText } = render(<Button />);
        expect(queryByText((content, element) => element.tagName.toLowerCase() === 'button')).toBeInTheDocument(); // check if button element is present
        expect(queryByText((content, element) => element.tagName.toLowerCase() === 'button')).toHaveClass('button'); // check if button element has the class 'button'
    });

});
