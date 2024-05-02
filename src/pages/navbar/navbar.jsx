import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
function Navbar({data}) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [user, setUser] = useState([]);
    const navigate = useNavigate()

    const removeUser = () => {
        localStorage.removeItem("userData")
        setUser([]);
        navigate("/landingpage_jsonplaceholder")
    }

    useEffect(() => {
        setUser(userData)
    }, [data]);

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-info mb-5">
                <div className="container">
                    <a className="navbar-brand text-white fw-bold" href="#">JSONPlaceholder</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {user?.id && (
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link " aria-current="page" to="/landingpage_jsonplaceholder/posts">Post</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link " aria-current="page" to="/landingpage_jsonplaceholder/albums">Album</Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                       data-bs-toggle="dropdown" aria-expanded="false">
                                        Hello, {user.name}
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><Link className="dropdown-item" to="/landingpage_jsonplaceholder/profile">Profile</Link></li>
                                        <li>
                                            <button type="button"
                                                    className="dropdown-item text-capitalize btn btn-link"
                                                    onClick={removeUser}
                                            >Logout
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        );
}

Navbar.propTypes = {
    data: PropTypes.arrayOf(Object).isRequired
};

export default Navbar

