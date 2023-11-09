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
    getPost: async (id) => {
        try {
            const res = await request.get(`posts/${id}`); // Replace "users" with "posts"
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error: ", err);
            throw err;
        }
    },
};

export default PostService;
