import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export default function RadioPaymentMethodGroup({ onChange }) {
    const data = [
        {
            name: "Thanh toán khi nhận hàng",
            value: "COD",
            disable: false,
        },
        {
            name: "Thanh toán bằng ví Viettel Money",
            value: "VIETTEL",
            disable: true,
        },
        {
            name: "Thanh toán bằng ví MoMo",
            value: "MOMO",
            disable: true,
        },
        {
            name: "Thanh toán bằng VNPAY",
            value: "VNPAY",
            disable: false,
        },
    ];

    const handleChange = (e) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <FormControl>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={data[0].value}
                sx={{
                    mt: 2,
                }}
                name="radio-buttons-group"
                onChange={handleChange}
            >
                {data.map((label, i) => (
                    <FormControlLabel
                        key={i}
                        sx={{
                            "& .MuiTypography-root": {
                                fontFamily: "var(--font-family)",
                            },
                        }}
                        value={label.value}
                        control={<Radio />}
                        label={label.name}
                        disabled={label.disable}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
}
