import axios from "axios";

const baseURL = "https://online-gateway.ghn.vn/shiip/public-api/";

const requestGHN = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
        token: "43176ed6-7fc7-11ee-b394-8ac29577e80e",
    },
    withCredentials: false,
});

export default requestGHN;
