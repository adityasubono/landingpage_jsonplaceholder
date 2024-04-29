import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PostsService from "../../service/api/get-posts.js";

const Posts = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const retrievePosts = async () => {
            try {
                const response = await PostsService.getUserPosts(userId);
                setPosts(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        retrievePosts();

    }, [userId]);

    const handleDelete = async (postId) => {
        try {
            await PostsService.deletePost(postId);
            setPosts(posts.filter(post => post.id !== postId));
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (postId, title, body) => {
        console.log()
        navigate(`/post/edit/${postId}`, { state: { id: postId, title, body, userId } });
    };

    const handleAdd = () => {
        // Redirect to the add post route
        navigate('/post/add');
    };

    return (
        <div>
            <h2>Post List User {userId}</h2>
            <button onClick={handleAdd}>Add New Post</button>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link to={`/post/${post.id}`}>{post.title}</Link>
                        <button onClick={() => handleEdit(post.id, post.title, post.body)}>Edit</button>
                        <button onClick={() => handleDelete(post.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Posts;
