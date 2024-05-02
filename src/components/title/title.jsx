import PropTypes from "prop-types";
import {FaUser, FaUserAlt} from "react-icons/fa";
function Title({title, subTitle}) {
    return (
        <div>
            <div className="d-flex flex-column border-bottom">
                <div className="fs-3">{title}</div>
                <div className="fs-4">{subTitle}</div>
            </div>
        </div>
    );
}

Title.propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
};
export default Title;
