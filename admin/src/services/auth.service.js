import request from "../utils/request";


// const authService = async () => {
//     try {
//         const res = await request.get("users");
//         console.log(res.data);
//     } catch (err) {
//         console.error("Error:", err);
//     }
// };

const AuthService = {
    login: async (data) => {
        try {
            const res = await request.post("login", data);
            return res;
        } catch (err) {
            return err.response.data;
        }
    }
}




export default AuthService;
