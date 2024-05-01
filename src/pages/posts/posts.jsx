import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostsService from "../../service/api/get-posts.js";
import {FaPen, FaPlus, FaTrash} from "react-icons/fa";

const Posts = () => {
    const initialPostState = {
        id: null,
        title: "",
        body: "",
        userId: null,
    };
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [posts, setPosts] = useState([]);
    const [dataPost, setDataPosts] = useState(initialPostState);

    const retrievePosts =  () => {
         PostsService.getUserPosts(userData.id)
            .then(response => {
                setPosts(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const savePost = () => {
        try {
            const newObj = {
                userId: userData.id,
                id: posts.length + 1,
                title: dataPost.title,
                body: dataPost.body,
            };
            const newArray = [...posts, newObj];
            setPosts(newArray)
            alert('data saved successfully')
            resetPost()
        }
        catch (error) {
            alert('data failed to save')
            resetPost()
        }
    };

    const updatePost = () => {
        const objIndex = posts.findIndex(obj => obj.id === dataPost.id);

        if (objIndex !== -1) {
            const updatedComments = [...posts];
            updatedComments[objIndex] = {
                ...updatedComments[objIndex],
                title: dataPost.title,
                body: dataPost.body,
            };
            setPosts(updatedComments);
            resetPost()
            alert("Post updated successfully");
        } else {
            alert("Post not found");
        }
    };

    const handleDelete = async (postId) => {
        try {
            setPosts(posts.filter(post => post.id !== postId));
            alert('data deleted successfully')
        } catch (error) {
            alert('data failed to delete')
        }
    };

    const handleEdit = (postId, title, body, userId) => {
        setDataPosts({
            id: postId,
            title: title,
            body: body,
            userId: userId
        });
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setDataPosts({ ...dataPost, [name]: value });
    };

    const resetPost = () => {
        setDataPosts(initialPostState);
    };

    useEffect(() => {
        retrievePosts();
    }, []);

    return (
        <div>
            <div className="sidebar-box">
                <h3 className="heading">Post List </h3>
                <div className="d-flex justify-content-end mb-3">
                    <button type="button"
                            className="btn btn-sm btn-outline-success"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            data-bs-whatever="@mdo">
                        <FaPlus/> New Post
                    </button>
                </div>

                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Body</th>
                        <th scope="col">Handle</th>
                    </tr>
                    </thead>
                    <tbody>
                    {posts.map((post, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td><Link className="text-capitalize" to={`/post/${post.id}`}>{post.title}</Link></td>
                            <td>{post.body}</td>
                            <td>
                                <button type="button"
                                        className="btn btn-outline-warning btn-sm me-2"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => handleEdit(post.id, post.title, post.body, post.userId)}
                                        data-bs-whatever="@mdo">
                                    <FaPen/>
                                </button>
                                <button className="btn btn-sm btn-outline-danger"
                                        onClick={() => handleDelete(post.id)}>
                                    <FaTrash/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>


            <div className="modal fade"
                 id="exampleModal"
                 tabIndex="-1"
                 aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {dataPost.id ? (
                            <div className="modal-header bg-info">
                                <h5 className="modal-title" id="exampleModalLabel">Update Post</h5>
                            </div>
                        ) : (
                            <div className="modal-header bg-success">
                                <h5 className="modal-title text-white" id="exampleModalLabel">New Post</h5>
                            </div>
                        )}

                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="col-form-label">Title:</label>
                                    <input type="text"
                                           className="form-control"
                                           id="title"
                                           name="title"
                                           value={dataPost.title}
                                           onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="body-text" className="col-form-label">Body:</label>
                                    <textarea className="form-control"
                                              rows="10"
                                              name="body"
                                              onChange={handleInputChange}
                                              value={dataPost.body}
                                              id="body-text">
                                    </textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button"
                                    className="btn btn-secondary"
                                    onClick={resetPost}
                                    data-bs-dismiss="modal">Close
                            </button>
                            {dataPost.id ? (<button type="button"
                                                    className="btn btn-info text-white"
                                                    data-bs-target="#exampleModal"
                                                    data-bs-dismiss="modal"
                                                    onClick={updatePost}>Update Post</button>
                            ) : (
                                <button type="button"
                                        className="btn btn-primary"
                                        data-bs-dismiss="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={savePost}>Save Post
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Posts;
