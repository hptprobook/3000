"use client";
import { useEffect, useState } from "react";

const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    if (typeof window !== "undefined") {
        const clientToken = localStorage.getItem("access_token");

        useEffect(() => {
            setIsLoggedIn(!!clientToken);
        }, [clientToken]);

        return isLoggedIn;
    }
};

export default useAuth;
