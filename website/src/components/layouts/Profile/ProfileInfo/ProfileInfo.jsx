"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import IconField from "@/components/common/TextField/IconField/IconField";
import BasicDatePicker from "@/components/common/TextField/DatePicker/DatePicker";
import GenderRadio from "@/components/common/Radio/Gender/GenderRadio";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Link from "next/link";

const StyledProfileInfo = styled("div")(() => ({
    borderRadius: "5px",
    backgroundColor: "#fff",
    padding: "16px",
    marginTop: "16px",
    display: "flex",
    "& .left": {
        borderRight: "1px solid rgb(235, 235, 240)",
        paddingRight: "20px",
        "& .first": {
            marginTop: "16px",
            display: "flex",
            alignItems: "center",
            "& .avatar": {
                border: "4px solid rgb(194, 225, 255)",
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                overflow: "hidden",
                cursor: "pointer",
                position: "relative",
                transition: ".3s ease",
                "&:hover .change": {
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    color: "#fff",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "13px",
                },
            },
            "& .fullname": {
                marginLeft: "24px",
            },
        },
        "& .save-info": {
            border: "none",
            outline: "none",
            color: "#fff",
            backgroundColor: "#0b74e5",
            width: "50%",
            height: "36px",
            borderRadius: "5px",
            marginTop: "12px",
            cursor: "pointer",
            "&:hover": {
                opacity: "0.8",
            },
        },
    },
    "& .right": {
        width: "100%",
        padding: "0 20px",
        "& .item": {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "12px",
            "& div": {
                color: "#a2a2a3",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                "& svg": {
                    marginRight: "8px",
                },
            },
            "& .update": {
                padding: "4px 12px",
                border: "1px solid #0d75e5",
                borderRadius: "4px",
                backgroundColor: "#fff",
                color: "#0d75e5",
                cursor: "pointer",
                transition: ".15s ease",
                "&:hover": {
                    color: "#fff",
                    backgroundColor: "#0d75e5",
                },
            },
        },
    },
}));

export default function ProfileInfo() {
    return (
        <StyledProfileInfo>
            <div className="left">
                <p>Thông tin cá nhân</p>
                <div className="first">
                    <div className="avatar">
                        <img
                            className="img-c"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png"
                            alt=""
                        />
                        <div className="change">Thay đổi</div>
                    </div>
                    <div className="fullname">
                        <div>
                            <IconField
                                icon={<BadgeIcon />}
                                text={"Họ và tên"}
                                value={"Phan Thanh Hóa"}
                            />
                        </div>
                        <div
                            style={{
                                marginTop: "12px",
                            }}
                        >
                            <IconField
                                icon={<LocalPhoneIcon />}
                                text={"Số điện thoại"}
                                value={"0833129021"}
                            />
                        </div>
                    </div>
                </div>
                <div className="birthdate">
                    <BasicDatePicker label={"Ngày sinh"} date={"04/14/2000"} />
                </div>
                <div className="gender">
                    <GenderRadio />
                </div>
                <button className="save-info">Lưu thay đổi</button>
            </div>
            <div className="right">
                <p>Bảo mật</p>
                <div className="email item">
                    <div>
                        <EmailIcon sx={{ color: "#a2a2a3" }} />
                        <span>Thay đổi địa chỉ Email</span>
                    </div>
                    <Link href={""}>
                        <button className="update">Cập nhật</button>
                    </Link>
                </div>
                <div className="password item">
                    <div>
                        <LockIcon />
                        <span>Đổi mật khẩu</span>
                    </div>
                    <Link href={""}>
                        <button className="update">Cập nhật</button>
                    </Link>
                </div>
            </div>
        </StyledProfileInfo>
    );
}
