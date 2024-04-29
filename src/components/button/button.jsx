import styles from "./button.module.css";
import PropTypes from "prop-types";

export default function Button({ text, buttonFunction, ...props }) {
  return (
    <button className={styles.button} onClick={buttonFunction} {...props}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  buttonFunction: PropTypes.func,
};
