import request from "../utils/request";

const AuthService = {
    login: async (data) => {
        try {
            const res = await request.post("login", data);
            console.log(res.data);
        } catch (err) {
            console.log("Error: ", err);
        }
    },
};

export default AuthService;
