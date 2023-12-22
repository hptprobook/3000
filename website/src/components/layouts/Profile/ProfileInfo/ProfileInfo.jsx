"use client";
import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import GenderRadio from "@/components/common/Radio/Gender/GenderRadio";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField } from "@mui/material";
import CirLoading from "@/components/common/Loading/CircularLoading/CirLoading";
import { updateCurrentUser } from "@/redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import ProgressLoading from "@/components/common/Loading/ProgressLoading/ProgressLoading";

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
        "& .birthdate": {
            marginTop: "12px",
            input: {
                width: "100%",
                height: "40px",
                borderRadius: "3px",
                border: "1px solid #0000003b",
                paddingLeft: "12px",
                fontSize: "15px",
                fontFamily: "var(--font-family)",
                cursor: "text",
                outline: "none",
                "&:hover": {
                    borderColor: "#333",
                },
                "&:focus": {
                    border: "2px solid #2184ff",
                },
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
        .min(2, "Giá trị không hợp lệ")
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
    const dispatch = useDispatch();
    const { updateUser, error } = useSelector((state) => state.users);

    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            birth_date: "",
            gender: null,
        },
        validationSchema: updateUserSchema,
        onSubmit: async (value, { setSubmitting }) => {
            const data = {
                name: value.name,
                phone_number: value.phone || null,
                birth_date: value.birth_date,
                gender: value.gender || "other",
            };

            try {
                await dispatch(updateCurrentUser(data)).unwrap();
                toast.success("Cập nhật thông tin thành công", {
                    autoClose: 2000,
                });
            } catch (err) {
                toast.error("Số điện thoại đã tồn tại", {
                    autoClose: 3000,
                });
            }
            setSubmitting(false);
        },
    });

    useEffect(() => {
        if (error == "The phone number has already been taken.") {
            formik.setErrors({ phone: "Số điện thoại đã tồn tại!" });
        }
    }, [error, formik.setErrors]);

    useEffect(() => {
        if (user) {
            formik.setValues({
                name: user.name || "",
                phone: user.phone_number || "",
                birth_date: user.birth_date || new Date(),
                gender: user.gender || "",
            });
        }
    }, [user]);

    if (!user) {
        return <ProgressLoading />;
    }

    return (
        <StyledProfileInfo>
            <form onSubmit={formik.handleSubmit}>
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
                                        formik.touched.name &&
                                        formik.errors.name
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
                                        formik.touched.phone &&
                                        formik.errors.phone
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="birthdate">
                        <label for="birthdate">Ngày sinh</label>
                        <input
                            name="birth_date"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.birth_date}
                            className="mt-12"
                            type="date"
                            id="birthdate"
                            error={
                                formik.touched.birth_date &&
                                Boolean(formik.errors.birth_date)
                            }
                        />
                        {formik.touched.birth_date &&
                            formik.errors.birth_date && (
                                <div className="error-message">
                                    {formik.errors.birth_date}
                                </div>
                            )}
                    </div>
                    <div className="gender">
                        <GenderRadio
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.gender}
                            name={"gender"}
                            error={
                                formik.touched.gender &&
                                Boolean(formik.errors.gender)
                            }
                            helperText={
                                formik.touched.gender && formik.errors.gender
                            }
                        />
                    </div>
                    <button className="save-info">Lưu thay đổi</button>
                </div>
            </form>
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
                    <Link href={"/profile/changePassword"}>
                        <button className="update">Cập nhật</button>
                    </Link>
                </div>
            </div>
        </StyledProfileInfo>
    );
}
