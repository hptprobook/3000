import request from "../utils/request";

const UserService = {
    getAllUser: async () => {
        try {
            const res = await request.get("users");
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error: ", err);
            throw err;
        }
    },
    getUser: async (id) => {
        try {
            const res = await request.get(`users/${id}`);
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log("Error: ", err);
            throw err;
        }
    },
};

export default UserService;
