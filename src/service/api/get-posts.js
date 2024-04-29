import http from "../../http-common.js";

const getUserPosts = (userId) => {
    return http.get(`/posts?userId=${userId}`);
};

const getAllUserPosts = () => {
    return http.get(`/posts`);
};

const getPost = (postId) => {
    return http.get(`/posts/${postId}`);
};

const addPost = (post) => {
    return http.post('/posts', post);
};

const editPost = (postId, updatedPost) => {
    return http.put(`/posts/${postId}`, updatedPost);
};

const deletePost = (postId) => {
    return http.delete(`/posts/${postId}`);
};

const PostsService = {
    getAllUserPosts,
    getUserPosts,
    getPost,
    addPost,
    editPost,
    deletePost
};

export default PostsService;
