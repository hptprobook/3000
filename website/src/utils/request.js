"use client";

import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.withCredentials = true;

const request = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

request.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("access_token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getCsrfToken = async () => {
    try {
        await request.get("/sanctum/csrf-cookie");
    } catch (error) {
        console.error("Lỗi khi lấy CSRF token:", error);
    }
};

export const get = async (path, options = {}) => {
    try {
        const response = await request.get(path, options);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const post = async (path, data = {}, options = {}) => {
    try {
        const response = await request.post(path, data, options);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const put = async (path, data = {}, options = {}) => {
    try {
        const response = await request.put(path, data, options);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const remove = async (path, options = {}) => {
    try {
        const response = await request.delete(path, options);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default request;
