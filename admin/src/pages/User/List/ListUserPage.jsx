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

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchAllUsers());
        }
    }, [status, dispatch]);

    if (status === "loading") {
        return <div><Loading /></div>;
    }

    if (status === "failed") {
        return <div>Error: {error}</div>;
    }

    if (status === "succeeded") {
        return (
            <div>
                <HeaderPage namePage={'Người dùng'} />
                <TableUser data={users} />
            </div>
        );
    }
};

export default ListUserPage;

