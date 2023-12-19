"use client";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
    Autocomplete,
    Checkbox,
    FormControlLabel,
    Grid,
    TextField,
} from "@mui/material";
import CirLoading from "@/components/common/Loading/CircularLoading/CirLoading";
import { getDistrictList, getWardList } from "@/redux/slices/deliverySlice";
import { useDispatch, useSelector } from "react-redux";
import { getAddressById, updateAddress } from "@/redux/slices/addressSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import ProgressLoading from "@/components/common/Loading/ProgressLoading/ProgressLoading";

const StyledProfileEditAddress = styled("div")(() => ({
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

export default function ProfileEditAddress({ data, provinces }) {
    const [selectedProvinceId, setSelectedProvinceId] = useState(null);
    const [selectedDistrictId, setSelectedDistrictId] = useState(null);
    const [selectedWardId, setSelectedWardId] = useState(null);
    const router = useRouter();

    const [districtOptions, setDistrictOptions] = useState([]);
    const [wardOptions, setWardOptions] = useState([]);

    const handleProvinceChange = (event, value) => {
        if (value) {
            formik.setFieldValue("province", value);
            setSelectedProvinceId(value.id);

            // Reset district and ward selections
            setSelectedDistrictId(null);
            setSelectedWardId(null);
            formik.setFieldValue("district", null);
            formik.setFieldValue("ward", null);

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
            formik.setFieldValue("district", null);
            formik.setFieldValue("ward", null);
            setDistrictOptions([]);
            setWardOptions([]);
        }
    };

    const handleDistrictChange = (event, value) => {
        if (value) {
            setSelectedDistrictId(value.DistrictID);
            formik.setFieldValue("district", value);

            // Reset ward selection
            setSelectedWardId(null);
            formik.setFieldValue("ward", null);
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
            formik.setFieldValue("ward", null);
            setWardOptions([]);
        }
    };

    const handleWardChange = (event, value) => {
        if (value) {
            setSelectedWardId(value.WardCode);
            formik.setFieldValue("ward", value);
        }
    };

    const dispatch = useDispatch();
    const addressById = useSelector(
        (state) => state.addresses.addressById.data
    );
    const status = useSelector((state) => state.addresses.status);

    useEffect(() => {
        if (data) {
            dispatch(getAddressById(data));
        }
    }, [data]);
    // Formik
    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            province:
                (provinces &&
                    provinces?.data?.find(
                        (p) => p.id === addressById?.province_id
                    )) ||
                null,
            district: null,
            ward: null,
            address: "",
            isDefault: false,
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

            if (data) {
                dispatch(updateAddress({ id: data, data: payload }))
                    .then(() => {
                        toast.success("Cập nhật địa chỉ thành công", {
                            autoClose: 2000,
                        });
                        setTimeout(() => {
                            router.push("/profile/address");
                        }, 1000);
                    })
                    .catch((error) => {
                        toast.error(error);
                    });

                if (address) {
                    dispatch(clearAddress());
                }
            } else {
                console.log("hâha");
            }
        },
    });

    useEffect(() => {
        if (addressById) {
            formik.setValues({
                name: addressById.name || "",
                phone: addressById.phone || "",
                province:
                    provinces.data.find(
                        (p) => p.id === addressById.province_id
                    ) || null,
                district: null, // Sẽ được set sau khi có dữ liệu từ API
                ward: null, // Tương tự như district
                address: addressById.street || "",
                isDefault: addressById.default === 1,
            });
            // Lấy dữ liệu district
            dispatch(
                getDistrictList({ province_id: addressById.province_id })
            ).then((response) => {
                const districts = response.payload.data;
                setDistrictOptions(districts);
                formik.setFieldValue(
                    "district",
                    districts.find(
                        (d) => d.DistrictID === addressById.district_id
                    ) || null
                );

                // Lấy dữ liệu ward sau khi có district
                dispatch(
                    getWardList({ district_id: addressById.district_id })
                ).then((response) => {
                    const wards = response.payload.data;
                    setWardOptions(wards);
                    formik.setFieldValue(
                        "ward",
                        wards.find((w) => w.WardCode == addressById.ward_id) ||
                            null
                    );
                });
            });
        }
    }, [addressById]);

    if (!addressById) {
        return <ProgressLoading />;
    } else {
        return (
            <StyledProfileEditAddress>
                <p>Sửa địa chỉ</p>
                <form className="form" onSubmit={formik.handleSubmit}>
                    <Grid container spacing={1.5}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                size="small"
                                id="outlined-required"
                                label="Họ và tên"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.name &&
                                    Boolean(formik.errors.name)
                                }
                                helperText={
                                    formik.touched.name && formik.errors.name
                                }
                                value={formik.values.name}
                                name="name"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                size="small"
                                id="outlined-required"
                                label="Số điện thoại"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.phone &&
                                    Boolean(formik.errors.phone)
                                }
                                helperText={
                                    formik.touched.phone && formik.errors.phone
                                }
                                value={formik.values.phone}
                                name="phone"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                                disablePortal
                                size="small"
                                id="combo-box-demo"
                                options={provinces.data}
                                value={formik.values.province}
                                onChange={handleProvinceChange}
                                onBlur={() => {
                                    formik.setFieldTouched("province", true);
                                }}
                                getOptionLabel={(option) =>
                                    option ? option.province_name : ""
                                }
                                getOptionSelected={(option, value) =>
                                    option.id === value.id
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
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
                                value={formik.values.district}
                                options={districtOptions}
                                onChange={handleDistrictChange}
                                onBlur={() => {
                                    formik.setFieldTouched("district", true);
                                }}
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
                                        value={formik.values.province}
                                        label="Quận / Huyện *"
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
                                value={formik.values.ward}
                                onBlur={() => {
                                    formik.setFieldTouched("ward", true);
                                }}
                                onChange={handleWardChange}
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
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                size="small"
                                required
                                id="outlined-required"
                                label="Số nhà / đường"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.address &&
                                    Boolean(formik.errors.address)
                                }
                                helperText={
                                    formik.touched.address &&
                                    formik.errors.address
                                }
                                value={formik.values.address}
                                name="address"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                sx={{
                                    "& .MuiTypography-root": {
                                        fontSize: "14px",
                                    },
                                }}
                                control={
                                    <Checkbox
                                        name="isDefault"
                                        checked={formik.values.isDefault}
                                        onChange={formik.handleChange}
                                        value="isDefault"
                                    />
                                }
                                label="Đặt địa chỉ làm mặc định"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <button className="submit" type="submit">
                                Chỉnh sửa
                            </button>
                        </Grid>
                    </Grid>
                </form>
            </StyledProfileEditAddress>
        );
    }
}
