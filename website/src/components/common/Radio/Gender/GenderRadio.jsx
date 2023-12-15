import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function GenderRadio({ value, onChange, onBlur, name }) {
    return (
        <FormControl
            className="d-flex"
            style={{
                marginTop: "12px",
            }}
        >
            <FormLabel id="demo-row-radio-buttons-group-label">
                Giới tính
            </FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                name={name}
            >
                <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Nam"
                />
                <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Nữ"
                />
                <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Khác"
                />
            </RadioGroup>
        </FormControl>
    );
}
