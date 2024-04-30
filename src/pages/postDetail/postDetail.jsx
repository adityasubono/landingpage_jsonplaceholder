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

const Comments = ({postId}) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const retrieveComments = async () => {
            try {
                const response = await PostCommentsService.getPostComments(postId);
                setComments(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        retrieveComments();

    }, [postId]);

    return (
        <div>
            <h3 className="heading">Comments Post Id: {postId}</h3>

            <div className='d-flex justify-content-end'>
                <button className='btn btn-outline-success btn-sm mb-3'>
                    <FaPlus/> Add Comment
                </button>
            </div>

            {comments.map((comment, index) => (
                <div className='card mb-3' key={index}>
                    <div className="card-header d-flex justify-content-between">
                        <div className='text-capitalize fw-bold'>
                            {comment.name}
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
                        <button className='btn btn-outline-warning btn-sm'>
                            <FaPen/>
                        </button>
                        <button className='btn btn-outline-danger btn-sm'>
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
