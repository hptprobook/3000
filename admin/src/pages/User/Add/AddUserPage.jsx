import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers } from "~/redux/slices/userSlice";

const AddUserPage = () => {
    /* test redux */

    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users.data);
    const status = useSelector((state) => state.users.status);
    const error = useSelector((state) => state.users.error);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchAllUsers());
        }
    }, [status, dispatch]);

    if (status === "loading") return <div>Loading...</div>;
    if (status === "failed") return <div>Error: {error}</div>;

    return (
        <ul>
            ADD
        </ul>
    );
};

export default AddUserPage;
