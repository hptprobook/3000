"use client";
import CirLoading from "@/components/common/Loading/CircularLoading/CirLoading";
import ProfileAddress from "@/components/layouts/Profile/ProfileAddress/ProfileAddress";
import { getAddressGHN, getAddresses } from "@/redux/slices/addressSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileAddressPage() {
    const dispatch = useDispatch();

    const addresses = useSelector((state) => state.addresses);
    const addressFetchStatus = useSelector((state) => state.addresses.status);

    useEffect(() => {
        if (addressFetchStatus == "idle") {
            dispatch(getAddresses());
        }
    }, []);

    if (addressFetchStatus == "loading") {
        return <CirLoading />;
    }

    return (
        <div>
            <ProfileAddress data={addresses.addresses} />
        </div>
    );
}
