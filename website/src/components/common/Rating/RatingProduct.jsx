import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

const labels = {
    0.5: "Quá tệ",
    1: "Rất tệ",
    1.5: "Tệ ",
    2: "Khá tệ",
    2.5: "Tạm được",
    3: "Ok",
    3.5: "Khá tốt",
    4: "Tốt",
    4.5: "Tuyệt vời",
    5: "Rất tuyệt vời",
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function RatingProduct({ onRatingChange }) {
    const [value, setValue] = React.useState(3);
    const [hover, setHover] = React.useState(-1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (onRatingChange) {
            onRatingChange(newValue);
        }
    };

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
            }}
        >
            <Rating
                name="hover-feedback"
                value={value}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={handleChange}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
            />
            {value !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
        </Box>
    );
}
