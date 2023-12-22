import request from "@/utils/request";

const handleRequest = async (endpoint, params = {}) => {
    try {
        const res = await request.get(endpoint, { params });
        return res.data;
    } catch (err) {
        console.error(`Error fetching data from ${endpoint}:`, err);
        throw err;
    }
};

const UserService = {
    getAllUsers: async () => {
        return handleRequest("users");
    },

    getUserById: async (id) => {
        return handleRequest(`users/${id}`);
    },

    getCurrentUser: async () => {
        try {
            const res = await request.get("users/current_user");
            return res;
        } catch (err) {
            return err.response;
        }
    },

    updateUser: async (user, id) => {
        try {
            const res = await request.put(`users/${id}`, user);
            return res;
        } catch (err) {
            return err.response;
        }
    },

    updateCurrentUser: async (user) => {
        try {
            const res = await request.put("users/updateCurrentUser", user);
            return res;
        } catch (err) {
            return {
                error: true,
                message: err.response?.data?.errors,
            };
        }
    },
};

export default UserService;
