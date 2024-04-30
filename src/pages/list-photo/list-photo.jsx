import UserService from "../../service/api/get-users.js";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

function ListPhoto() {
    const { albumId } = useParams();
    const [dataUserPhoto, setDataUserPhoto] = useState([]);
    const retrievePhoto =  () => {
        UserService.getPhotoUserById(albumId)
            .then(response => {
                setDataUserPhoto(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        retrievePhoto();
    }, [albumId]);

    return (
        <div>
            <h3 className="heading">Photo List Album ID {albumId} </h3>
            <div className='row'>
                {dataUserPhoto.map((photo, index) => (
                    <div className='col-6 mt-2' key={index}>
                        <div className='card'>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={photo.thumbnailUrl} className="img-fluid rounded-start" alt="..."/>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title text-capitalize">{photo.title}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default ListPhoto;
