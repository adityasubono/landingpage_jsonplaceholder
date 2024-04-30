import PropTypes from "prop-types";
import {Link} from "react-router-dom";


export default function ListUser({id, name}) {
        return (
            <div>
                <ul>
                    <li>
                        <Link to={"user/" + id + "/posts"}>
                            {name}
                        </Link>
                    </li>
                </ul>
            </div>

        );
}

ListUser.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
};

