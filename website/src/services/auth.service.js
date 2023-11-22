import request from "../utils/request";

const AuthService = {
    login: async (data) => {
        try {
            const res = await request.post("login", data);
            return res.data;
        } catch (err) {
            console.log(err.response);
            return err.response;
        }
    },
    register: async (data) => {
        try {
            const res = await request.post("register", data);
            return res.data;
        } catch (err) {
            console.log(err.response);
            return err.response;
        }
    },
    logout: async () => {
        try {
            await axios.post("/api/logout");
            return;
        } catch (err) {
            console.log(err.response);
            return err.response;
        }
    },
};

export default AuthService;
