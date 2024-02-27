"use client";
import ProgressLoading from "@/components/common/Loading/ProgressLoading/ProgressLoading";
import NotAuth from "@/components/common/Middleware/NotAuth";
import ProfileAddress from "@/components/layouts/Profile/ProfileAddress/ProfileAddress";
import useAuth from "@/hooks/useAuth";
import { getAddresses } from "@/redux/slices/addressSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileAddressPage() {
    const isAuth = useAuth();
    const dispatch = useDispatch();

    const addresses = useSelector((state) => state.addresses);
    const addressFetchStatus = useSelector((state) => state.addresses.status);
    const address = useSelector((state) => state.addresses.address);
    const deleted = useSelector((state) => state.addresses.deleted);

    useEffect(() => {
        dispatch(getAddresses());
    }, [address, deleted]);

    if (addressFetchStatus === "loading") {
        return <ProgressLoading />;
    }

    if (!isAuth) {
        return <NotAuth />;
    }

    return (
        <div>
            <ProfileAddress data={addresses.addresses} />
        </div>
    );
}
