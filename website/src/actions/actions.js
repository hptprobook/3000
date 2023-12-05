"use server";

import request from "@/utils/request";

export const getTags = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/tags");

    return response.data;
};
