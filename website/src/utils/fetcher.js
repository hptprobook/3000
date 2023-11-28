import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

const axiosInstance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
    withCredentials: true,
});

export const fetchGet = async (url) => {
    try {
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchPost = async (url, data) => {
    try {
        const response = await axiosInstance.post(url, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchPut = async (url, data) => {
    try {
        const response = await axiosInstance.put(url, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchDelete = async (url) => {
    try {
        const response = await axiosInstance.delete(url);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default {
    get: fetchGet,
    post: fetchPost,
    put: fetchPut,
    delete: fetchDelete,
};
