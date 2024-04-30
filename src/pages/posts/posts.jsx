import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PostsService from "../../service/api/get-posts.js";
import UserService from "../../service/api/get-users.js";
import {FaPen, FaPlus, FaTrash} from "react-icons/fa";

const Posts = () => {
    const { userId } = useParams();
    const initialPostState = {
        id: null,
        title: "",
        body: "",
        userId: userId
    };

    const [posts, setPosts] = useState([]);
    const [dataPost, setDataPosts] = useState(initialPostState);
    const [dataUserAlbums, setDataUserAlbums] = useState([]);

    const retrievePosts =  () => {
         PostsService.getUserPosts(userId)
            .then(response => {
                setPosts(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retrieveAlbums =  () => {
         UserService.getAlbumsUserById(userId)
            .then(response => {
                setDataUserAlbums(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };



    useEffect(() => {
        retrievePosts();
        retrieveAlbums();
    }, [userId]);

    const savePost = () => {
        const data = {
            id: dataPost.id,
            title: dataPost.title,
            body: dataPost.body,
            userId: dataPost.userId
        };

        PostsService.addPost(data)
            .then(response => {
                setDataPosts({
                    id: response.data.id,
                    title: response.data.title,
                    body: response.data.body,
                    userId: response.data.userId
                });
                console.log(response.data);
                alert('Data Berhasil Disimpan')
                setDataPosts(initialPostState)
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updatePost = () => {
        const data = {
            id: dataPost.id,
            title: dataPost.title,
            body: dataPost.body,
            userId: dataPost.userId
        };

        PostsService.editPost(dataPost.id, data)
            .then(response => {
                console.log(response.data);
                alert('Data  Berhasil Diedit')
                setDataPosts(initialPostState)
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleDelete = async (postId) => {
        try {
            await PostsService.deletePost(postId);
            alert('Berhasil Dihapus')
            setPosts(posts.filter(post => post.id !== postId));
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (postId, title, body, userId) => {
        setDataPosts({
            id: postId,
            title: title,
            body: body,
            userId: userId
        });
        console.log()
        // navigate(`/post/edit/${postId}`, { state: { id: postId, title, body, userId } });
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setDataPosts({ ...dataPost, [name]: value });
    };

    const resetPost = () => {
        setDataPosts(initialPostState);
    };

    return (
        <div>
            <div className="sidebar-box">
                <h3 className="heading">Post List User ID {userId} </h3>
                <div className="d-flex justify-content-end mb-3">
                    <button type="button"
                            className="btn btn-sm btn-outline-success"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            data-bs-whatever="@mdo">
                        <FaPlus/> New Post
                    </button>
                </div>

                <ul className="categories">
                    {posts.map((post, index) => (
                        <li className="d-flex justify-content-between" key={index}>
                            <div className="d-flex">
                                <p className="me-2">{index + 1}.</p>
                                <Link className="text-capitalize" to={`/post/${post.id}`}>{post.title}</Link>
                            </div>

                            <div className="">
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
                            </div>
                        </li>
                    ))}
                </ul>
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

            <h3 className="heading">Albums List User ID {userId} </h3>

            {dataUserAlbums.map((album, index) => (
                <li className="d-flex justify-content-between" key={index}>
                    <div className="d-flex">
                        <p className="me-2">{index + 1}.</p>
                        <Link className="text-capitalize" to={`/album/${album.id}`}>{album.title}</Link>
                    </div>
                </li>
            ))}
        </div>
    );
};

export default Posts;
