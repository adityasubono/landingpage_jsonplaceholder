import http from "../../http-common.js";

const getPostComments = (postId) => {
    return http.get(`/posts/${postId}/comments`);
};

const addPostComments = (postId) => {
    return http.post(`/posts/${postId}/comments`);
};

const PostCommentsService = {
    getPostComments,
    addPostComments
};

export default PostCommentsService;
