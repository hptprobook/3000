import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers } from "~/redux/slices/userSlice";
import TableUser from "../../../components/common/Table/TableUser";
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import Loading from "../../../components/common/Loading/Loading";

const ListUserPage = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);
    const status = useSelector((state) => state.users.status);
    const error = useSelector((state) => state.users.error);
    const [loadData, setLoadData] = useState(false);
    useEffect(() => {
        if (!loadData) {
            dispatch(fetchAllUsers());
            if (status !== 'idle') {
                setLoadData(true);
            }
        }
    }, [loadData, dispatch, status]);

    if (status === "loading") {
        return <div><Loading /></div>;
    }

    if (status === "failed") {
        return <div>Error: </div>;
    }

    if (status === "succeeded") {
        return (
            <div>
                <HeaderPage
                    namePage={'Người dùng'}
                    Breadcrumb={['Người dùng', 'Danh sách']}
                    ButtonLink='/user/create' />
                <TableUser data={users} />
            </div>
        );
    }
};

export default ListUserPage;