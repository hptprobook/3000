import request from "../utils/request";

const PostService = {
    getAllPosts: async () => {
        try {
            const res = await request.get("posts"); // Replace "users" with "posts"
            return res.data;
        } catch (err) {
            console.log("Error: ", err);
            throw err;
        }
    },
    getPostByID: async (id) => {
        try {
            const res = await request.get(`posts/${id}`); // Replace "users" with "posts"
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error: ", err);
            throw err;
        }
    },
    createPost: async (data) => {
        try {
            const res = await request.post(`posts`, data);
            return res;
        } catch (err) {
            throw err;
        }
    },
};

export default PostService;
