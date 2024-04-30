import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import PostsService from "../../service/api/get-posts.js";
import PostCommentsService from "../../service/api/get-post-comments.js";
import {FaPen, FaPlus, FaTrash, FaUser} from "react-icons/fa";

const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState([]);

    useEffect(() => {
        const retrievePosts = async () => {
            try {
                const response = await PostsService.getPost(postId);
                setPost(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        retrievePosts();

    }, []);

    return (
        <div>
            <h3 className="heading">Post Id: {postId}</h3>
            {post && (
                <div>
                    <h2 className="text-capitalize">{post.title}</h2>
                    <p>{post.body}</p>
                    <Comments postId={post.id}/>
                </div>
            )}
        </div>
    );
};

export const Comments = ({postId}) => {
    const initialComment = {
        postId: null,
        id: null,
        email: "",
        name: "",
        body: "",
    };
    const [comments, setComments] = useState( []);
    const [dataComment, setDataComment] = useState(initialComment)
    const retrieveComments = async () => {
        try {
            const response = await PostCommentsService.getPostComments(postId);
            if (response) {
                setComments(response.data);
            } else {
                console.error('No response received');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        retrieveComments();
    }, [postId]);

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
                body: dataComment.body,
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

    return (
        <div>
            <h3 className="heading">Comments Post Id: {postId}</h3>

            <div className='d-flex justify-content-end'>
                <button type="button" className="btn btn-outline-success btn-sm mb-3"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop">
                    <FaPlus/> New Comment
                </button>
            </div>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
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
                                <label htmlFor="title" className="col-form-label" aria-labelledby="Name">Name:</label>
                                    <input type="text"
                                           className="form-control"
                                           id="name"
                                           name="name"
                                           value={dataComment.name}
                                           onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="col-form-label" aria-labelledby="E-mail">E-mail:</label>
                                    <input type="text"
                                           className="form-control"
                                           id="email"
                                           name="email"
                                           value={dataComment.email}
                                           onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="body-text" className="col-form-label" aria-labelledby="Body">Body:</label>
                                    <textarea className="form-control"
                                              name="body"
                                              onChange={handleInputChange}
                                              value={dataComment.body}
                                              id="body-text">
                                    </textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button"
                                    className="btn btn-secondary"
                                    onClick={resetData}
                                    data-bs-dismiss="modal">Close</button>

                            {dataComment.id ? (
                                <button type="button"
                                        className="btn btn-info text-white"
                                        data-bs-dismiss="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={updateComment}>
                                    Edit
                                </button>
                            ) : (
                                <button type="button"
                                        className="btn btn-success"
                                        data-bs-dismiss="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={saveComment}>Save
                                </button>
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
                    <div className="card-body">
                        <p>{comment.body}</p>
                        <div></div>
                    </div>

                    <div className='d-flex justify-content-end gap-3 p-3'>
                        <button className='btn btn-outline-warning btn-sm'
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                                onClick={() => handleEdit(comment)}
                        >
                            <FaPen/>
                        </button>
                        <button className='btn btn-outline-danger btn-sm'
                                onClick={() => handleDelete(comment.id)}
                        >
                            <FaTrash/>
                        </button>
                    </div>
                </div>
            ))}

        </div>
    );
};

Comments.propTypes = {
    postId: PropTypes.number.isRequired,
};

export default PostDetail;
