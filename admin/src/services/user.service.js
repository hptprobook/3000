import request from "../utils/request";

const UserService = {
    getAllUser: async () => {
        try {
            const res = await request.get("users");
            return res.data;
        } catch (err) {
            console.log("Error: ", err);
            throw err;
        }
    },
    getUser: async (id) => {
        try {
            const res = await request.get(`users/${id}`);
            return res.data;
        } catch (err) {
            console.log("Error: ", err);
            throw err;
        }
    },
    editUser: async (id, data) => {
        try {
            const res = await request.put(`users/${id}`, data);
            return res.data;
        } catch (err) {
            console.log("Error: ", err);
            throw err;
        }
    },
};

export default UserService;
