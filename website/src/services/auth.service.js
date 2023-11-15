import request from "../utils/request";

const AuthService = {
    login: async (data) => {
        try {
            const res = await request.post("login", data);
            return res;
        } catch (err) {
            return err.response;
        }
    },
};

export default AuthService;
