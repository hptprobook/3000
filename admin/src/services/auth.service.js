import request from "../utils/request";

const authService = async () => {
    try {
        const res = await request.get("users");
        console.log(res);
    } catch (err) {
        console.error("Error:", err);
    }
};

export default authService;
