import axios from "axios";

const baseURL = import.meta.env.VITE_REACT_API_URL;
const accessToken = localStorage.getItem("access_token");

const request = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
    },
});

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
};

export default request;
