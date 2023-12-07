"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import IconField from "@/components/common/TextField/IconField/IconField";
import BasicDatePicker from "@/components/common/TextField/DatePicker/DatePicker";

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
                                text={"Số điện thoại"}
                                value={"0833129021"}
                            />
                        </div>
                    </div>
                </div>
                <div className="birthdate">
                    <BasicDatePicker label={"Ngày sinh"} date={"04/14/2000"} />
                </div>
                <div className="gender">Giới tính</div>
                <button>Lưu thay đổi</button>
            </div>
            <div className="right"></div>
        </StyledProfileInfo>
    );
}
