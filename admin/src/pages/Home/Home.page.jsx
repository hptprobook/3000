import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import AuthService from "../../services/auth.service";

export default function HomePage() {
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await AuthService.login();
            } catch (error) {
                console.error("Error:", error);
            }
        };
    });

    return (
        <div>
            <h1>Home Page</h1>
        </div>
    );
}
