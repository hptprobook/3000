"use client";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Link from "next/link";
import CirLoading from "@/components/common/Loading/CircularLoading/CirLoading";
import { deleteAddress } from "@/redux/slices/addressSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import ProgressLoading from "@/components/common/Loading/ProgressLoading/ProgressLoading";

const StyledProfileAddress = styled("div")(() => ({
    "& .create": {
        width: "100%",
        height: "60px",
        border: "1px dashed #ccc",
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        marginTop: "12px",
    },
    "& .item": {
        padding: "12px",
        backgroundColor: "#fff",
        borderRadius: "4px",
        marginTop: "16px",
        "& .head": {
            padding: "8px 0",
            "& .name": {
                fontSize: "15px",
                fontWeight: 500,
                "& .default": {
                    fontSize: "13px",
                    color: "#26bc4e",
                    marginLeft: "12px",
                },
            },
            "& .handle": {
                fontSize: "14px",
                "& a": {
                    color: "var(--link-color)",
                    marginRight: "12px",
                },
                "& button": {
                    border: "none",
                    outline: "none",
                    padding: "6px 12px",
                    color: "#ff424e",
                    cursor: "pointer",
                },
            },
        },
        "& .content": {
            fontSize: "14px",
            "& p": {
                padding: "2px 0",
            },
        },
    },
}));

export default function ProfileAddress({ data }) {
    const dispatch = useDispatch();

    const handleDelete = (id, isDefault) => {
        if (isDefault) {
            toast.error("Không thể xóa địa chỉ mặc định");
            return;
        }

        dispatch(deleteAddress(id))
            .then(() => {
                toast.success(`Xóa thành công địa chỉ`);
            })
            .catch((error) => {
                toast.error("Xảy ra lỗi khi xóa địa chỉ");
                console.error(error);
            });
    };

    if (!data) {
        return <ProgressLoading />;
    }

    return (
        <StyledProfileAddress>
            <p>Sổ địa chỉ</p>
            <Link href={"/profile/address/create"}>
                <div className="create">
                    <AddIcon
                        sx={{
                            marginRight: "16px",
                        }}
                    />{" "}
                    Thêm địa chỉ mới
                </div>
            </Link>
            {data?.map((address) => (
                <div className="item">
                    <div className="head jc-sb">
                        <p className="name d-flex">
                            {address?.name.toUpperCase()}
                            {address?.default === 1 ? (
                                <span className="default at-c">
                                    <CheckCircleOutlineIcon
                                        sx={{
                                            fontSize: "13px",
                                            marginRight: "4px",
                                        }}
                                    />
                                    Địa chỉ mặc định
                                </span>
                            ) : (
                                ""
                            )}
                        </p>
                        <div className="handle">
                            <Link
                                href={{
                                    pathname: "/profile/address/edit",
                                    query: { addressId: address?.id },
                                }}
                            >
                                Chỉnh sửa
                            </Link>
                            <button
                                onClick={() =>
                                    handleDelete(
                                        address?.id,
                                        address?.default === 1
                                    )
                                }
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                    <div className="content">
                        <p>Địa chỉ: {address?.address_info}</p>
                        <p>Điện thoại: {address?.phone}</p>
                    </div>
                </div>
            ))}
        </StyledProfileAddress>
    );
}
