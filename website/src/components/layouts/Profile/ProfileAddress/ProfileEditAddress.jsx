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

export default function ProfileEditAddress({ data, provinces }) {
    const [selectedProvinceId, setSelectedProvinceId] = useState(null);
    const [selectedDistrictId, setSelectedDistrictId] = useState(null);
    const [selectedWardId, setSelectedWardId] = useState(null);

    const [districtOptions, setDistrictOptions] = useState([]);
    const [wardOptions, setWardOptions] = useState([]);

    const handleProvinceChange = (event, value) => {
        if (value) {
            setSelectedProvinceId(value.id);
            setSelectedDistrictId(null); // Reset district selection
            setSelectedWardId(null); // Reset ward selection
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
            setSelectedWardId(null); // Reset ward selection
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

    return (
        <StyledProfileEditAddress>
            <p>Sửa địa chỉ</p>
            <form className="form" action="">
                <Grid container spacing={1.5}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            size="small"
                            required
                            id="outlined-required"
                            label="Họ và tên"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            size="small"
                            required
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
                            onChange={handleProvinceChange}
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
                            value={
                                districtOptions.find(
                                    (d) => d.DistrictID === selectedDistrictId
                                ) || null
                            }
                            options={districtOptions}
                            onChange={handleDistrictChange}
                            getOptionLabel={(option) =>
                                option ? option.DistrictName : ""
                            }
                            getOptionSelected={(option, value) =>
                                option.DistrictID === value.id
                            }
                            sx={{ width: 300 }}
                            renderInput={(params) => (
                                <TextField {...params} label="Quận / Huyện *" />
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
                                wardOptions.find(
                                    (w) => w.WardCode === selectedWardId
                                ) || null
                            }
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
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            sx={{
                                "& .MuiTypography-root": {
                                    fontSize: "14px",
                                },
                            }}
                            control={<Checkbox />}
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
