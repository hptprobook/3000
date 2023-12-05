"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

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
            <Grid
                container
                sx={{
                    alignItems: " center",
                    color: "#363636",
                    fontSize: "14px",
                }}
            >
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
                <Grid item xs={5.5}>
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
                <Grid item xs={0.5}>
                    Delete
                </Grid>
            </Grid>
            {checked.map((item, index) => (
                <Grid
                    container
                    key={index}
                    sx={{
                        alignItems: "center",
                    }}
                >
                    <Grid item xs={0.5}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={item}
                                    onChange={handleChange(index)}
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={5.5}>
                        SP {index + 1}
                    </Grid>
                    <Grid item xs={2.5}>
                        200.000d
                    </Grid>
                    <Grid item xs={1.5}>
                        2
                    </Grid>
                    <Grid item xs={1.5}>
                        400.000d
                    </Grid>
                    <Grid item xs={0.5}>
                        <DeleteOutlineIcon />
                    </Grid>
                </Grid>
            ))}
        </StyledCartContainer>
    );
}
