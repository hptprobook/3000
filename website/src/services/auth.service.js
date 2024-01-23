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
            await request.post("logout");
            return;
        } catch (err) {
            return err.response;
        }
    },
    changePassword: async (data) => {
        try {
            const res = await request.post("changePassword", data);
            return res;
        } catch (err) {
            return {
                error: true,
                message: err.response?.data?.error,
            };
        }
    },
    forgotPassword: async (data) => {
        try {
            const res = await request.post("auth/password/forgot", data);
            return res;
        } catch (err) {
            return {
                error: true,
                message: err.response,
            };
        }
    },
};

export default AuthService;
