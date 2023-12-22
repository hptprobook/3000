import axios from "axios";

const baseURL = import.meta.env.VITE_REACT_API_URL;

// Function to get the access token from local storage
const getAccessToken = () => localStorage.getItem("access_token");

const request = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`, // Initial value
    },
});

// Intercept requests and update the Authorization header
request.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getAccessToken()}`;
    return config;
});

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
};
export const post = async (path, options = {}) => {
    const response = await request.post(path, options);
    return response.data;
};
export const put = async (path, options = {}) => {
    const response = await request.put(path, options);
    return response.data;
};

export default request;
