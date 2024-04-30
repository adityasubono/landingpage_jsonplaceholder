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
                    <div className='col-1 mt-2' key={index}>
                        <img src={photo.thumbnailUrl}
                             data-bs-toggle="modal"
                             data-bs-target={"#staticBackdrop"+index}
                             className="img-thumbnail rounded-start"
                             alt={photo.thumbnailUrl}/>


                        <div className="modal fade"
                             id={"staticBackdrop"+index}
                             data-bs-backdrop="static"
                             data-bs-keyboard="false"
                             tabIndex="-1"
                             aria-labelledby="staticBackdropLabel"
                             aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Detail Photo</h5>
                                    </div>
                                    <div className="modal-body">
                                        <img src={photo.url}
                                             className="img-thumbnail rounded-start"
                                             alt={photo.thumbnailUrl}/>
                                        <p>{photo.title}</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button"
                                                className="btn btn-secondary"
                                                data-bs-dismiss="modal">Close
                                        </button>
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
