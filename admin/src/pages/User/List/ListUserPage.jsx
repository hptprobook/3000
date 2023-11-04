import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import UserService from "~/services/user.service";
import "./style.css";

export default function ListUserPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const data = await UserService.getAllUser();
                setUsers(data.data);
                setError(null);
            } catch (error) {
                console.error("Error:", error);
                setError("Không thể lấy dữ liệu từ server.");
            }
            setLoading(false);
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography>Error: {error}</Typography>;
    }

    return (
        <div>
            <Typography variant="h1">User list Page</Typography>
            {users && users.length > 0 ? (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
            ) : (
                <Typography>Không có người dùng nào.</Typography>
            )}
        </div>
    );
}
