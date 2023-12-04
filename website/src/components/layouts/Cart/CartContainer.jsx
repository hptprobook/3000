"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";

const StyledCartContainer = styled("div")(() => ({
    //
}));

export default function CartContainer() {
    const [checked, setChecked] = useState([true, false, false, false, false]);

    const handleChange = (position) => (event) => {
        const updatedChecked = [...checked];
        updatedChecked[position] = event.target.checked;
        setChecked(updatedChecked);
    };

    const allChecked = checked.every(Boolean);
    const indeterminate = checked.some(Boolean) && !allChecked;

    return (
        <StyledCartContainer>
            <Grid container>
                <Grid item xs={0.5}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={allChecked}
                                indeterminate={indeterminate}
                                onChange={(e) =>
                                    setChecked(
                                        checked.map(() => e.target.checked)
                                    )
                                }
                            />
                        }
                    />
                </Grid>
                <Grid item xs={5}>
                    Tất cả (4 sản phẩm)
                </Grid>
                <Grid item xs={2.5}>
                    Đơn giá
                </Grid>
                <Grid item xs={1.5}>
                    Số lượng
                </Grid>
                <Grid item xs={1.5}>
                    Thành tiền
                </Grid>
                <Grid item xs={1}>
                    Delete
                </Grid>
            </Grid>
            {checked.map((item, index) => (
                <Box key={index}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={item}
                                onChange={handleChange(index)}
                            />
                        }
                    />
                    SP {index + 1}
                </Box>
            ))}
        </StyledCartContainer>
    );
}
