import React, {Component, useEffect, useState} from 'react';
import UserService from "../../service/api/get-users.js";
import UserCard from "../../components/user-card/user-card.jsx";
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

