import Button from "../button/button";
import styles from "./modal.module.css";
import PropTypes from "prop-types";

export default function Modal({ theModalIsOpen, buttonFunction, children }) {
  if (!theModalIsOpen) return null;

  const modalClosures = (e) => {
    if (e.target.className === styles.modal) {
      buttonFunction();
    }
  };

  return (
    <article className={styles.modal} onClick={modalClosures}>
      <article className={styles.modalContent}>
        {children}
        <Button buttonFunction={buttonFunction} text="Close" />
      </article>
    </article>
  );
}

Modal.propTypes = {
  theModalIsOpen: PropTypes.bool,
  buttonFunction: PropTypes.func,
};
