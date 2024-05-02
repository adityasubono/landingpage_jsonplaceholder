import './card.module.css'
import PropTypes from "prop-types";
function Card({image, name, phone, email, children}) {
    return (
        <div className="card shadow p-3 bg-light bg-gradient">
            <div className=" border-6 border-black">
                <img alt="" src={image} className="img-fluid w-25 rounded-circle mb-3"/>
            </div>
            <div className="d-flex flex-column">
                <div className='fs-4'>{name}</div>
                <div className='fs-5'>{email}</div>
                <div className='fs-5'>{phone}</div>
            </div>
            {children}
        </div>
    );
}

Card.propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    children: PropTypes.element,
};

export default Card;
