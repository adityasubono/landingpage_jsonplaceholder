import UserService from "../../service/api/get-users.js";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Button from "../../components/button/button.jsx";
import SkeletonCard from "../../components/skeleton/skeleton-card.jsx";
function ListPhoto({albumId}) {
    const [dataUserPhoto, setDataUserPhoto] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const retrievePhoto =  () => {
        setIsLoading(true)
        UserService.getPhotoUserById(albumId)
            .then(response => {
                setIsLoading(false)
                setDataUserPhoto(response.data);
            })
            .catch(e => {
                setIsLoading(true)
                console.log(e);
            });
    };

    useEffect(() => {
        retrievePhoto();
    }, []);

    return (
        <div>
            <div className='row'>

                {isLoading && (<SkeletonCard/>)}
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

ListPhoto.propTypes = {
    albumId: PropTypes.number,
};

