import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostsService from "../../service/api/get-posts.js";
import Comments from "../comments/comments.jsx";

const PostDetail = () => {
    const { postId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [post, setPost] = useState([]);

    useEffect(() => {
        const retrievePosts = async () => {
            setIsLoading(true)
            await PostsService.getPost(postId).then(response =>{
                setPost(response.data);
                setIsLoading(false)
            }).catch( error =>{
                console.log(error);
                setIsLoading(true)
            })
        };

        retrievePosts();

    }, [postId]);

    return (
        <div className="sidebar-box">

            <h3 className="heading">Detail Post</h3>

            {isLoading && (
                <div>
                    <p aria-hidden="true">
                        <span className="placeholder col-3"></span>
                    </p>
                    <p aria-hidden="true">
                        <span className="placeholder col-7"></span>
                    </p>
                    <p aria-hidden="true">
                        <span className="placeholder col-7"></span>
                    </p>
                </div>
            )}


            <div>
                <h2 className="text-capitalize">{post.title}</h2>
                <p>{post.body}</p>
                <Comments postId={post.id}/>
            </div>
        </div>
    );
};
export default PostDetail;
