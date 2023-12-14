"use client";
import React, { useEffect } from "react";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField } from "@mui/material";
import CirLoading from "@/components/common/Loading/CircularLoading/CirLoading";

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

const updateUserSchema = Yup.object().shape({
    name: Yup.string()
        .required("Họ và tên không được để trống")
        .min(5, "Giá trị không hợp lệ")
        .test(
            "two-words",
            "Họ và phải chứa ít nhất hai từ",
            (value) => value && value.trim().split(/\s+/).length >= 2
        )
        .max(128, "Họ và tên không vượt quá 255 ký tự"),
    phone: Yup.string().matches(/^0[0-9]{9}$/, "Số điện thoại không hợp lệ"),
    birth_date: Yup.date()
        .max(new Date(), "Ngày sinh không thể là trong tương lai.")
        .min(
            new Date(new Date().setFullYear(new Date().getFullYear() - 120)),
            "Tuổi không thể lớn hơn 120."
        ),
});

export default function ProfileInfo({ user }) {
    console.log("🚀 ~ file: ProfileInfo.jsx:104 ~ ProfileInfo ~ user:", user);
    function formatDate(date) {
        const d = new Date(date);
        let month = "" + (d.getMonth() + 1);
        let day = "" + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [month, day, year].join("/");
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            birth_date: formatDate(new Date()),
            gender: null,
        },
        validationSchema: updateUserSchema,
        onSubmit: (value) => {
            console.log("submit");
        },
    });

    useEffect(() => {
        if (user) {
            formik.setValues({
                name: user.name || "",
                phone: user.phone_number || "",
                birth_date: user?.birth_date
                    ? formatDate(user.birth_date)
                    : formatDate(new Date()),
                gender: user.gender || "",
            });
        }
    }, [user]);

    if (!user) {
        return <CirLoading />;
    }

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
                            <TextField
                                fullWidth
                                name="name"
                                size="small"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.name &&
                                    Boolean(formik.errors.name)
                                }
                                helperText={
                                    formik.touched.name && formik.errors.name
                                }
                                id="outlined-required"
                                label="Họ và tên"
                            />
                        </div>
                        <div
                            style={{
                                marginTop: "12px",
                            }}
                        >
                            <TextField
                                sx={{
                                    width: "300px",
                                }}
                                size="small"
                                name="phone"
                                label="Số điện thoại"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.phone &&
                                    Boolean(formik.errors.phone)
                                }
                                helperText={
                                    formik.touched.phone && formik.errors.phone
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="birthdate">
                    <BasicDatePicker
                        label={"Ngày sinh"}
                        date={formik.values.birth_date}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.birth_date &&
                            Boolean(formik.errors.birth_date)
                        }
                        helperText={
                            formik.touched.birth_date &&
                            formik.errors.birth_date
                        }
                    />
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
                        <span>Xác minh địa chỉ Email</span>
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
