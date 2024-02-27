import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "@emotion/styled";
import color from "../../../config/colorConfig";
import { FormHelperText } from "@mui/material";
const FormSelectEdit = styled(FormControl)(({ theme }) => ({
    margin: 0,
    width: "100%",
    "& .MuiInputBase-root.MuiFilledInput-root": {
        borderRadius: "14px",
        border: "2px solid" + color.colorHover.hoverGray,
        transition: "border .4s linear",
        color: color.textColor.dark,
    },
    "& .MuiInputBase-root.MuiFilledInput-root.Mui-focused": {
        border: "2px solid" + color.focusedColor.dark,
        transition: "border .4s linear",
    },
    "& .MuiInputBase-root.MuiFilledInput-root::before": {
        border: "none",
    },
    "& .MuiInputBase-root.MuiFilledInput-root:hover:not(.Mui-disabled, .Mui-error):before":
        {
            border: "none",
        },
    "& .MuiInputBase-root.MuiFilledInput-root:hover:not(.Mui-disabled, .Mui-error)":
        {
            backgroundColor: color.colorHover.hoverGray,
        },
    "& .MuiInputBase-root.MuiFilledInput-root::after": {
        border: "none",
    },
    "& .MuiFormLabel-root.MuiInputLabel-root": {
        color: color.textColor.dark,
    },
    "& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused": {
        color: color.focusedColor.dark,
    },
    "& svg": {
        color: color.textColor.dark,
    },
}));
export default function SelectEdit({
    label,
    data,
    value,
    onChange,
    error,
    nullData,
    disable,
    id,
    name,
}) {
    const [select, setSelect] = React.useState(value == null ? "" : value);

    const handleChange = (event) => {
        setSelect(event.target.value);
    };
    return (
        <FormSelectEdit variant="filled" fullWidth sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id={id ? id : "label-select-id"}>{label}</InputLabel>
            <Select
                labelId={id ? id : "label-select-id"}
                id="demo-simple-select-filled"
                value={select}
                name={name}
                disabled={disable ? true : false}
                onChange={handleChange}
            >
                {nullData ? <MenuItem value={""}>Trống</MenuItem> : null}
                {data.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                        {item.name}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText
                sx={{
                    color: color.textColor.error,
                }}
            >
                {error}
            </FormHelperText>
        </FormSelectEdit>
    );
}
