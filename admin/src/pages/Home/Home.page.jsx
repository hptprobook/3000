import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import authService from "../../services/auth.service";

export default function HomePage() {
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await authService();
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchApi();
    }, []);

    return (
        <div>
            <h1>Home Page</h1>
        </div>
    );
}
