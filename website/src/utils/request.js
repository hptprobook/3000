"use client";

import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

const request = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
});

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
