import http from "../../http-common.js";

const getAllAlbums = () => {
    return http.get(`/albums}`);
};


const AlbumsService = {
    getAllAlbums
};

export default AlbumsService;
