import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import PostsService from "../../service/api/get-posts.js";
import PostCommentsService from "../../service/api/get-post-comments.js";

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
            <h2>Posts Id {postId}</h2>
            {post && (
                <div>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                    <Comments postId={post.id} />
                </div>
            )}
        </div>
    );
};

const Comments = ({ postId }) => {
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
            <h2>Comments Post {postId}</h2>
        <ul>
            {comments.map((comment) => (
                <li key={comment.id}>
                    <strong>{comment.name}</strong>: {comment.body}
                </li>
            ))}
        </ul>
        </div>
    );
};

Comments.propTypes = {
    postId: PropTypes.number.isRequired,
};

export default PostDetail;
