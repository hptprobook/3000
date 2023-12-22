"use client";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
    Autocomplete,
    Checkbox,
    FormControlLabel,
    Grid,
    TextField,
} from "@mui/material";
import { getDistrictList, getWardList } from "@/redux/slices/deliverySlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addAddresses, clearAddress } from "@/redux/slices/addressSlice";
import { useRouter } from "next/navigation";

const addressSchema = Yup.object().shape({
    name: Yup.string()
        .required("Họ và tên không được để trống")
        .min(3, "Giá trị không hợp lệ")
        .test(
            "two-words",
            "Họ và phải chứa ít nhất hai từ",
            (value) => value && value.trim().split(/\s+/).length >= 2
        )
        .max(255, "Họ và tên không vượt quá 255 ký tự"),
    phone: Yup.string()
        .required("Số điện thoại không được để trống")
        .matches(/^[0-9]+$/, "Chỉ nhập số")
        .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
        .max(11, "Số điện thoại không quá 11 chữ số"),
    province: Yup.object()
        .nullable()
        .required("Tỉnh / Thành phố không được để trống")
        .shape({
            id: Yup.number().required("Chưa chọn tỉnh / thành phố"),
            province_name: Yup.string().required(),
        }),
    district: Yup.object()
        .nullable()
        .required("Quận / Huyện không được để trống")
        .shape({
            DistrictID: Yup.number().required("Chưa chọn quận / huyện"),
            DistrictName: Yup.string().required(),
        }),
    ward: Yup.object()
        .nullable()
        .required("Phường / Trị trấn không được để trống")
        .shape({
            WardCode: Yup.string().required("Chưa chọn phường / trị trấn"),
            WardName: Yup.string().required(),
        }),
    address: Yup.string()
        .required("Số nhà / đường không được để trống")
        .max(255, "Địa chỉ không vượt quá 255 ký tự"),
});

const StyledProfileCreateAddress = styled("div")(() => ({
    "& .form": {
        marginTop: "12px",
        "& .MuiAutocomplete-root": {
            width: "100%",
        },
        "& .submit": {
            width: "160px",
            height: "40px",
            backgroundColor: "#fdd835",
            border: "none",
            outline: "none",
            borderRadius: "4px",
            fontSize: "14px",
            cursor: "pointer",
            ":hover": {
                opacity: "0.8",
            },
        },
    },
}));

export default function ProfileCreateAddress({
    provinces,
    isOrder,
    isOrdered,
}) {
    const [selectedProvinceId, setSelectedProvinceId] = useState(null);
    const [selectedDistrictId, setSelectedDistrictId] = useState(null);
    const [selectedWardId, setSelectedWardId] = useState(null);

    const [districtOptions, setDistrictOptions] = useState([]);
    const [wardOptions, setWardOptions] = useState([]);

    const handleProvinceChange = (event, value) => {
        if (value) {
            setSelectedProvinceId(value.id);
            setSelectedDistrictId(null);
            setSelectedWardId(null);
            setDistrictOptions([]);
            setWardOptions([]);
            dispatch(getDistrictList({ province_id: value.id }))
                .then((response) => {
                    const districts = response.payload.data;
                    setDistrictOptions(districts);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setSelectedProvinceId(null);
            setSelectedDistrictId(null);
            setSelectedWardId(null);
            setDistrictOptions([]);
            setWardOptions([]);
        }
    };

    const handleDistrictChange = (event, value) => {
        if (value) {
            setSelectedDistrictId(value.DistrictID);
            setSelectedWardId(null);
            setWardOptions([]);
            dispatch(getWardList({ district_id: value.DistrictID }))
                .then((response) => {
                    const wards = response.payload.data;
                    setWardOptions(wards);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setSelectedDistrictId(null);
            setSelectedWardId(null);
            setWardOptions([]);
        }
    };

    const handleWardChange = (event, value) => {
        if (value) {
            setSelectedWardId(value.WardCode);
        }
    };

    const dispatch = useDispatch();
    const districtList = useSelector((state) => state.deliveries);
    const address = useSelector((state) => state.addresses.address);
    const router = useRouter();

    // Formik
    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            province: null,
            district: null,
            ward: null,
            address: "",
            isDefault: 0,
        },
        validationSchema: addressSchema,
        onSubmit: (values) => {
            const province_id = values.province ? values.province.id : null;
            const district_id = values.district
                ? values.district.DistrictID
                : null;
            const ward_code = values.ward ? values.ward.WardCode : null;

            const province_name = values.province
                ? values.province.province_name
                : "";
            const district_name = values.district
                ? values.district.DistrictName
                : "";
            const ward_name = values.ward ? values.ward.WardName : "";
            const fullAddress = `${values.address}, ${ward_name}, ${district_name}, ${province_name}`;

            const payload = {
                name: values.name,
                phone: values.phone,
                province_id,
                district_id,
                street: values.address,
                ward_id: ward_code,
                address_info: fullAddress,
                default: values.isDefault,
            };

            dispatch(addAddresses(payload))
                .then(() => {
                    toast.success("Thêm mới địa chỉ thành công", {
                        autoClose: 2000,
                    });
                    if (isOrder) {
                        setTimeout(() => {
                            router.back();
                        }, 1000);
                    } else {
                        setTimeout(() => {
                            router.push("/profile/address");
                        }, 1000);
                    }
                })
                .catch((error) => {
                    toast.error(error);
                });

            if (address) {
                dispatch(clearAddress());
            }
        },
    });

    const handleProvinceSelect = (event, value) => {
        formik.setFieldValue("province", value);
        handleProvinceChange(event, value);
    };

    const handleDistrictSelect = (event, value) => {
        formik.setFieldValue("district", value);
        handleDistrictChange(event, value);
    };

    const handleWardSelect = (event, value) => {
        formik.setFieldValue("ward", value);
        handleWardChange(event, value);
    };

    return (
        <StyledProfileCreateAddress>
            <p>Tạo sổ địa chỉ</p>
            <form className="form" onSubmit={formik.handleSubmit}>
                <Grid container spacing={1.5}>
                    <Grid item xs={6}>
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
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            size="small"
                            name="phone"
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
                            id="outlined-required"
                            label="Số điện thoại"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Autocomplete
                            disablePortal
                            size="small"
                            id="combo-box-demo"
                            options={provinces.data}
                            onChange={handleProvinceSelect}
                            value={formik.values.province}
                            getOptionLabel={(option) =>
                                option ? option.province_name : ""
                            }
                            getOptionSelected={(option, value) =>
                                option.id === value.id
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    error={Boolean(formik.errors.province)}
                                    helperText={formik.errors.province}
                                    // value={formik.values.province}
                                    value="Hà Nội"
                                    label="Tỉnh / Thành phố *"
                                />
                            )}
                            sx={{ width: 300 }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <Autocomplete
                            disablePortal
                            size="small"
                            id="combo-box-district"
                            key={selectedProvinceId}
                            value={
                                (formik.values.district &&
                                    districtOptions.find(
                                        (d) =>
                                            d.DistrictID === selectedDistrictId
                                    )) ||
                                null
                            }
                            options={districtOptions}
                            onChange={handleDistrictSelect}
                            getOptionLabel={(option) =>
                                option ? option.DistrictName : ""
                            }
                            getOptionSelected={(option, value) =>
                                option.DistrictID === value.id
                            }
                            sx={{ width: 300 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Quận / Huyện *"
                                    error={Boolean(formik.errors.district)}
                                    helperText={formik.errors.district}
                                    value={formik.values.district}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Autocomplete
                            disablePortal
                            size="small"
                            id="combo-box-demo"
                            options={wardOptions}
                            sx={{ width: 300 }}
                            value={
                                (formik.values.ward &&
                                    wardOptions.find(
                                        (w) => w.WardCode === selectedWardId
                                    )) ||
                                null
                            }
                            onChange={handleWardSelect}
                            getOptionLabel={(option) =>
                                option ? option.WardName : ""
                            }
                            getOptionSelected={(option, value) =>
                                option.WardCode === value.id
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Phường / Trị trấn *"
                                    error={Boolean(formik.errors.ward)}
                                    helperText={formik.errors.ward}
                                    value={formik.values.ward}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            size="small"
                            id="outlined-required"
                            label="Số nhà / đường"
                            name="address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.address &&
                                Boolean(formik.errors.address)
                            }
                            helperText={
                                formik.touched.address && formik.errors.address
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            sx={{
                                "& .MuiTypography-root": { fontSize: "14px" },
                            }}
                            control={
                                <Checkbox
                                    checked={formik.values.isDefault === 1}
                                    onChange={(event) =>
                                        formik.setFieldValue(
                                            "isDefault",
                                            event.target.checked ? 1 : 0
                                        )
                                    }
                                    name="isDefault"
                                />
                            }
                            label="Đặt địa chỉ làm mặc định"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <button className="submit" type="submit">
                            Thêm mới
                        </button>
                    </Grid>
                </Grid>
            </form>
        </StyledProfileCreateAddress>
    );
}
