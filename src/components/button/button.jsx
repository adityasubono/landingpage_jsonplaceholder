import PropTypes from "prop-types";

export default function Button({className, buttonFunction, children, ...props }) {
  return (
      <button className={className} onClick={buttonFunction} {...props}>
        {children}
      </button>
  )
}

Button.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.element,
  buttonFunction: PropTypes.func,
};
