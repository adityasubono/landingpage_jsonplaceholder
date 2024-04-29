import React from "react";
import PropTypes from "prop-types";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";

import Button from "../button/button";

import styles from "./user-card.module.css";
import {Link} from "react-router-dom";

export default function UserCard({ name, email, buttonFunction, value }) {
  return (
    <section className={styles.card}>
      <section className={styles.card__info}>
        <p className={styles.card__name}>
          <FaUser />
          {name}
        </p>
        <p className={styles.card__email}>
          <MdEmail />
          {email}
        </p>
        <p>
          <Link to={`user/${value}/posts`}> User Posts </Link>
        </p>
      </section>
      <Button buttonFunction={buttonFunction} text="More Info" value={value} />
    </section>
  );
}

UserCard.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  buttonFunction: PropTypes.func,
  value: PropTypes.number,
};
