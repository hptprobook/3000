import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import UserService from "~/services/user.service";
import Loading from "~/components/common/Loading/Loading";

import "./style.css";
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import TableUser from "../../../components/common/Table/TableUser";

export default function ListUserPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         setLoading(true);
    //         try {
    //             const data = await UserService.getAllUser();
    //             setUsers(data.data);
    //             setError(null);
    //         } catch (error) {
    //             console.error("Error:", error);
    //             setError("Không thể lấy dữ liệu từ server.");
    //         }
    //         setLoading(false);
    //     };

    //     fetchUsers();
    // }, []);

    if (loading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    // if (error) {
    //     return <Typography>Error: {error}</Typography>;
    // }

    return (
        <div>
            <HeaderPage namePage={'Người dùng'} />
            <TableUser />
        </div>
        // <div>
        //     <Typography variant="h1">User list Page</Typography>
        //     {users && users.length > 0 ? (
        //         <ul>
        //             {users.map((user) => (
        //                 <li key={user.id}>{user.name}</li>
        //             ))}
        //         </ul>
        //     ) : (
        //         <Typography>Không có người dùng nào.</Typography>
        //     )}
        // </div>
    );
}
