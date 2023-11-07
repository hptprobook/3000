import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers } from "~/redux/slices/userSlice";
import TableUser from "../../../components/common/Table/TableUser";
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import Loading from "../../../components/common/Loading/Loading";

const ListUserPage = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users.data);
    const status = useSelector((state) => state.users.status);
    const error = useSelector((state) => state.users.error);

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
    );
}
