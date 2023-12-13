import request from "@/utils/request";

const AuthService = {
    login: async (data) => {
        try {
            const res = await request.post("login", data);
            return res;
        } catch (err) {
            return {
                error: true,
                message: err.response?.data?.error || "Lỗi đăng nhập",
            };
        }
    },
    register: async (data) => {
        try {
            const res = await request.post("register", data);
            return res;
        } catch (err) {
            return {
                error: true,
                message: err.response?.data?.errors.email,
            };
        }
    },
    logout: async () => {
        try {
            await axios.post("/api/logout");
            return;
        } catch (err) {
            return err.response;
        }
    },
};

export default AuthService;
