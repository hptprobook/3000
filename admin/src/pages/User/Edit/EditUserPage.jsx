import { Box, Grid, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ButtonBackFullW from "~/components/common/Button/ButtonBackFullW";
import HeaderUser from "~/components/common/HeaderPage/HeaderUser";
import styled from "@emotion/styled";
import color from "~/config/colorConfig";
import { fetchUserById } from "~/redux/slices/userSlice";
import ButtonNormal from "~/components/common/Button/ButtonNormal";
import { useDispatch, useSelector } from "react-redux";
import Loading from "~/components/common/Loading/Loading";
import InputEdit from "~/components/common/TextField/InputEdit";
import { BiUser } from "react-icons/bi";
import { MdDateRange, MdEmail, MdPhone } from "react-icons/md";
import SelectEdit from "~/components/common/Select/SelectEdit";
import { setStatus, updateUserByID } from "../../../redux/slices/userSlice";
import * as Yup from "yup";
import { useFormik } from "formik";

const userSchema = Yup.object().shape({
    name: Yup.string()
        .required("Họ và tên không được để trống")
        .min(3, "Giá trị không hợp lệ")
        .test(
            "two-words",
            "Họ và tên phải chứa ít nhất hai từ",
            (value) => value && value.trim().split(/\s+/).length >= 2
        )
        .max(255, "Họ và tên không vượt quá 255 ký tự"),
    phone_number: Yup.string()
        .matches(/^[0-9]+$/, "Chỉ nhập số")
        .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
        .max(11, "Số điện thoại không quá 11 chữ số"),
    email: Yup.string()
        .required("Email không được để trống")
        .email("Địa chỉ email không hợp lệ")
        .max(255, "Email không vượt quá 255 ký tự"),
    // password: Yup.string()
    //     .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    //     .max(50, "Mật khẩu không vượt quá 50 ký tự"),
    birth_date: Yup.date().max(new Date(), "Ngày sinh không thể ở tương lai"),
});

const EditUserPage = () => {
    // lấy id từ url
    const { id } = useParams();
    console.log("🚀 ~ EditUserPage ~ id:", id);

    const [loadData, setLoadData] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.selectedUser);
    const status = useSelector((state) => state.users.status);
    const statusUpdate = useSelector((state) => state.users.status);

    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [phone_number, setPhone_number] = useState("");
    const [birth_date, setBirth_date] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        if (!loadData) {
            dispatch(fetchUserById(id));
            if (status === "user already") {
                setLoadData(true);
                setName(user.name);
                setGender(user.gender);
                setEmail(user.email);
                setPhone_number(user.phone_number);
                setBirth_date(user.birth_date);
                setRole(user.role);
                dispatch(setStatus("idle"));
            }
        }
    }, [loadData, id, dispatch, status]);

    const formik = useFormik({
        initialValues: {
            name,
            email,
            phone_number,
            gender,
            birth_date,
            role,
        },
        validationSchema: userSchema,
        onSubmit: (values) => {
            dispatch(updateUserByID({ userId: id, data: values }));
        },
        enableReinitialize: true,
    });

    useEffect(() => {
        if (statusUpdate === "") {
            alert("Uploading successful");
            setStatus("idle");
        }
    }, [statusUpdate]);

    if (status === "loading") {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    if (status === "failed") {
        return <div>Error:</div>;
    }

    if (loadData) {
        return (
            <Box
                sx={{
                    padding: "32px",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <ButtonBackFullW label={"Trở lại"} />
                <HeaderUser nameUser={user.name} role={user.role} />
                <Box
                    sx={{
                        flexGrow: 1,
                        padding: "32px",
                        marginTop: "32px",
                        backgroundColor: color.backgroundColorSub.dark,
                        borderRadius: "14px",
                    }}
                >
                    <Typography
                        sx={{ color: color.textColor.dark, fontSize: "16px" }}
                    >
                        Chỉnh sửa
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={4} sx={{ paddingTop: "32px" }}>
                            <Grid item sm={12} md={6}>
                                <InputEdit
                                    label={"Họ và tên"}
                                    value={formik.values.name}
                                    name={"name"}
                                    icon={<BiUser />}
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
                                />
                            </Grid>
                            <Grid item sm={12} md={6} lg={4}>
                                <InputEdit
                                    label={"Ngày sinh"}
                                    value={formik.values.birth_date}
                                    type={"date"}
                                    name={"birth_date"}
                                    icon={<MdDateRange />}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.birth_date &&
                                        Boolean(formik.errors.birth_date)
                                    }
                                    helperText={
                                        formik.touched.birth_date &&
                                        formik.errors.birth_date
                                    }
                                />
                            </Grid>
                            <Grid item sm={12} md={6} lg={2}>
                                <SelectEdit
                                    label={"Giới tính"}
                                    name={"gender"}
                                    data={[
                                        { id: "male", name: "Nam" },
                                        { id: "female", name: "Nữ" },
                                        { id: "other", name: "Khác" },
                                    ]}
                                    value={formik.values.gender}
                                />
                            </Grid>
                            <Grid item sm={12} md={6}>
                                <InputEdit
                                    label={"Email"}
                                    value={formik.values.email}
                                    type={"email"}
                                    name={"email"}
                                    icon={<MdEmail />}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.email &&
                                        Boolean(formik.errors.email)
                                    }
                                    helperText={
                                        formik.touched.email &&
                                        formik.errors.email
                                    }
                                />
                            </Grid>
                            <Grid item sm={12} md={6}>
                                <InputEdit
                                    label={"Số điện thoại"}
                                    value={formik.values.phone_number}
                                    type={"phone"}
                                    name={"phone_number"}
                                    icon={<MdPhone />}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.phone_number &&
                                        Boolean(formik.errors.phone_number)
                                    }
                                    helperText={
                                        formik.touched.phone_number &&
                                        formik.errors.phone_number
                                    }
                                />
                            </Grid>
                            <Grid item sm={12} md={6} lg={2}>
                                <SelectEdit
                                    label={"Vai trò"}
                                    data={[
                                        { id: "ADMIN", name: "ADMIN" },
                                        { id: "USER", name: "USER" },
                                        { id: "SELLER", name: "SELLER" },
                                    ]}
                                    name={"role"}
                                    value={formik.values.role}
                                />
                            </Grid>
                        </Grid>
                        <Box
                            sx={{
                                flexGrow: 1,
                                marginTop: "32px",
                                backgroundColor: color.backgroundColorSub.dark,
                                borderRadius: "14px",
                            }}
                        >
                            <button type="submit">Cập nhật</button>
                        </Box>
                    </form>
                </Box>
            </Box>
        );
    }
};

export default EditUserPage;
