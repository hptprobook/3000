import axios from "axios";

const baseURL = import.meta.env.VITE_REACT_API_URL;
const accessToken = localStorage.getItem("access_token");
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

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
export const post = async (path, options = {}) => {
    const response = await request.post(path, options);
    return response.data;
};

export default request;
