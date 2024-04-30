import http from "../../http-common.js";

const getUsers = () => {
    return http.get("/users");
};

const getUsersById = ({userId}) => {
    return http.get(`/users/${userId}`);
};

const getAlbumsUserById = (userId) => {
    return http.get(`/users/${userId}/albums`);
};

const getPhotoUserById = (userId) => {
    return http.get(`/albums/${userId}/photos`);
};

const UserService = {
    getUsers,
    getUsersById,
    getAlbumsUserById,
    getPhotoUserById
};

export default UserService;

