import * as React from 'react';
import Chip from '@mui/material/Chip';
import styled from '@emotion/styled';
import color from '../../../config/colorConfig';

const CustomChipFilter = styled(Chip)({
    margin: '5px',
    color: color.textColor.dark,
    border: '1px solid ' + color.textGray,
    '&  .MuiChip-deleteIcon ': {
        color: color.textGray
    },
    '&:hover .MuiChip-deleteIcon ': {
        color: color.colorHover.hoverGray
    }
    // Your custom styles go here
    // backgroundColor: '#ffcc00', // Example background color
    // color: '#333', // Example text color
    // Add more styles as needed
});
export default function ChipFilter({ funC, label }) {
    return (
        <CustomChipFilter label={label} variant="outlined" onDelete={funC} />
    );
}