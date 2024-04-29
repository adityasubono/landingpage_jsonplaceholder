import http from "../../http-common.js";

const getUsers = () => {
    return http.get("/users");
};

const getUsersById = ({userId}) => {
    return http.get(`/users/${userId}`);
};

const UserService = {
    getUsers,
};

export default UserService;

