import {FaPen, FaPlus, FaTrash} from "react-icons/fa";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import PostCommentsService from "../../service/api/get-post-comments.js";
import Button from "../../components/button/button.jsx";

function Comments({postId}) {
    const initialComment = {
        postId: null,
        id: null,
        email: "",
        name: "",
        body: "",
        image: ""
    };
    const gender = ["men", "women"];
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState( []);
    const [dataComment, setDataComment] = useState(initialComment);
    const retrieveComments = async (postId) => {
        setIsLoading(true)
        await PostCommentsService.getPostComments(postId)
            .then(response => {
                setIsLoading(false)
                setComments(response.data);
            }).catch(e => {
            setIsLoading(true)
                console.log(e)
                setIsLoading(true)
            });
    };

    const updateComment = () => {
        const objIndex = comments.findIndex(obj => obj.id === dataComment.id);
        if (objIndex !== -1) {
            const updatedComments = [...comments];
            updatedComments[objIndex] = {
                ...updatedComments[objIndex],
                name: dataComment.name,
                email: dataComment.email,
                body: dataComment.body,
            };

            setComments(updatedComments);
            resetData()
            alert("Comment updated successfully");
        } else {
            alert("Comment not found");
        }
    };
    const saveComment = () => {
        try {
            const newObj = {
                postId: postId,
                id: comments.length + 1,
                name: dataComment.name,
                email: dataComment.email,
                body: dataComment.body
            };
            const newArray = [...comments, newObj];
            setComments(newArray)
            resetData()
            alert('data saved successfully')
        } catch (error) {
            alert('data failed to save')
        }
    };

    const handleEdit = (data) => {
        setDataComment({
            postId: data.postId,
            id:data.id,
            name: data.name,
            email: data.email,
            body: data.body,
        })
    };
    const handleDelete = async (commentId) => {
        try {
            setComments(comments.filter(comment => comment.id !== commentId))
            alert('data deleted successfully')
        } catch (error) {
            alert('data failed to delete')
        }
    };
    const handleInputChange = event => {
        const { name, value } = event.target;
        setDataComment({ ...dataComment, [name]: value });
    };

    const resetData = () =>{
        setDataComment(initialComment)
    }

    useEffect(() => {
        retrieveComments(postId);
    }, [postId]);

    return (
        <div>
            <h3 className="heading">Comments Post {postId}</h3>
            {isLoading && (
                <div className="card" aria-hidden="true">
                    <div className='card-header'>
                        <p className="card-text placeholder-glow d-flex justify-content-between">
                            <span className="placeholder col-3"></span>
                            <span className="placeholder col-3"></span>
                        </p>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title placeholder-glow">
                            <span className="placeholder col-6"></span>
                        </h5>
                        <p className="card-text placeholder-glow">
                            <span className="placeholder col-7"></span>
                            <span className="placeholder col-4"></span>
                            <span className="placeholder col-4"></span>
                            <span className="placeholder col-6"></span>
                            <span className="placeholder col-8"></span>
                        </p>
                        <div className='d-flex justify-content-end gap-3'>
                            <a href="#" tabIndex="-1" className="btn btn-warning disabled placeholder col-1"></a>
                            <a href="#" tabIndex="-1" className="btn btn-danger disabled placeholder col-1"></a>
                        </div>
                    </div>
                </div>
            )}

            <div className='d-flex justify-content-end'>
                <Button type="button" className="btn btn-outline-success btn-sm mb-3"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop">
                    <FaPlus/> New Comment
                </Button>
            </div>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                 tabIndex="-1"
                 aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {dataComment.id ? (
                            <div className="modal-header bg-info text-white">
                                <h5 className="modal-title" id="staticBackdropLabel">Edit Comment</h5>
                            </div>
                        ) : (
                            <div className="modal-header bg-success text-white">
                                <h5 className="modal-title" id="staticBackdropLabel">New Comment</h5>
                            </div>
                        )}

                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                <label htmlFor="title" className="col-form-label"
                                           aria-labelledby="Name">Name:</label>
                                    <input type="text"
                                           className="form-control"
                                           id="name"
                                           name="name"
                                           value={dataComment.name}
                                           onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="col-form-label"
                                           aria-labelledby="E-mail">E-mail:</label>
                                    <input type="email"
                                           className="form-control"
                                           id="email"
                                           name="email"
                                           value={dataComment.email}
                                           onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="body-text" className="col-form-label"
                                           aria-labelledby="Body">Body:</label>
                                    <textarea className="form-control"
                                              rows="10"
                                              name="body"
                                              onChange={handleInputChange}
                                              value={dataComment.body}
                                              id="body-text">
                                    </textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <Button type="button"
                                    className="btn btn-secondary"
                                    buttonFunction={resetData}
                                    data-bs-dismiss="modal">Close
                            </Button>

                            {dataComment.id ? (
                                <Button type="button"
                                        className="btn btn-info text-white"
                                        data-bs-dismiss="modal"
                                        data-bs-target="#exampleModal"
                                        buttonFunction={updateComment}>
                                    Edit
                                </Button>
                            ) : (
                                <Button type="button"
                                        className="btn btn-success"
                                        data-bs-dismiss="modal"
                                        data-bs-target="#exampleModal"
                                        buttonFunction={saveComment}>Save
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {comments.map((comment, index) => (
                <div className='card mb-3' key={index}>
                    <div className="card-header d-flex justify-content-between">
                        <div className='text-capitalize fw-bold'>
                            {comment.name} #{comment.id}
                        </div>
                        <div className='text-lowercase text-muted'>
                            {comment.email}
                        </div>
                    </div>
                    <div className="card-body d-flex">
                        <img
                            src={`https://randomuser.me/api/portraits/thumb/${gender[Math.round(Math.random() * 1)]}/${Math.round(Math.random() * 99)}.jpg`}
                            alt="Image"
                            className="img-fluid  rounded-circle me-2"
                        />
                        <blockquote className="blockquote">
                            <p>{comment.body}</p>
                        </blockquote>
                    </div>

                    <div className='d-flex justify-content-end gap-3 p-3'>
                        <Button className='btn btn-outline-warning btn-sm'
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                                buttonFunction={() => handleEdit(comment)}
                        >
                            <FaPen/>
                        </Button>
                        <Button className='btn btn-outline-danger btn-sm'
                                buttonFunction={() => handleDelete(comment.id)}
                        >
                            <FaTrash/>
                        </Button>
                    </div>
                </div>
            ))}

        </div>
    );
}

Comments.propTypes = {
    postId: PropTypes.number,
};

export default Comments;
