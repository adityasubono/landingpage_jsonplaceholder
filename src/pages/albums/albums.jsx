import {Link} from "react-router-dom";
import UserService from "../../service/api/get-users.js";
import {useEffect, useState} from "react";
import ListPhoto from "../list-photo/list-photo.jsx";

function Albums() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [dataUserAlbums, setDataUserAlbums] = useState([]);
    const retrieveAlbums =  () => {
        UserService.getAlbumsUserById(userData.id)
            .then(response => {
                setDataUserAlbums(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        retrieveAlbums()
    }, []);

    return (
        <div className="sidebar-box">
            <h3 className="heading">Albums List </h3>
            <ol className="list-group list-group-numbered">
            {dataUserAlbums.map((album, index) => (
                <li className="list-group-item d-flex justify-content-between align-items-start" key={index}>
                    <div className="ms-2 me-auto">
                        <div className="fw-bold text-capitalize">{album.title}</div>
                        <ListPhoto albumId={album.id}/>
                    </div>
                </li>
            ))}
            </ol>
        </div>
    );
}

export default Albums;
