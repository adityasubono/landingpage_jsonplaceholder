import PropTypes from "prop-types";
import { FaUser, FaPhone, FaBuilding } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { BiSolidCity } from "react-icons/bi";
import { CgWebsite } from "react-icons/cg";
import styles from "./list-user-information.module.css";

export default function ListUserInformation({ userInfo }) {
  return (
    <>
      <h3 className={styles.title}>{userInfo.name}</h3>
      <ul className={styles.list}>
        <li className={styles.info__element}>
          <span className={styles.icons}>
            <FaUser />
          </span>
          {userInfo.username}
        </li>
        <li className={styles.info__element}>
          <span className={styles.icons}>
            <MdEmail />
          </span>
          {userInfo.email}
        </li>
        <li className={styles.info__element}>
          <span className={styles.icons}>
            <FaPhone />
          </span>
          {userInfo.phone}
        </li>
        <li className={styles.info__element}>
          <span className={styles.icons}>
            <CgWebsite />
          </span>
          {userInfo.website}
        </li>
      </ul>

      <section className={styles.separation}>
        <hr className={styles.hr} />
        <p className={styles.separation__name}>Company</p>
        <hr className={styles.hr} />
      </section>

      <ul className={styles.list}>
        <li className={styles.info__element}>
          <span className={styles.icons}>
            <FaBuilding />
          </span>
          {userInfo.company.name}
        </li>
      </ul>

      <section className={styles.separation}>
        <hr className={styles.hr} />
        <p className={styles.separation__name}>Address</p>
        <hr className={styles.hr} />
      </section>

      <ul className={styles.list}>
        <li className={styles.info__element}>
          <span className={styles.icons}>
            <MdLocationOn />
          </span>
          St {userInfo.address.street} {userInfo.address.suite}
        </li>
        <li className={styles.info__element}>
          <span className={styles.icons}>
            <BiSolidCity />
          </span>
          {userInfo.address.city} {userInfo.address.zipcode}
        </li>
      </ul>
    </>
  );
}
ListUserInformation.propTypes = {
  userInfo: PropTypes.object,
};
