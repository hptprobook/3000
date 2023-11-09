import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import styled from '@emotion/styled';
import color from '../../../config/colorConfig';

const CustomChipPostTag = styled(Chip)(({ theme }) => ({
    backgroundColor: color.backgroundChip.dark,
    marginRight: '12px',
    '& .MuiChip-label': {
        color: color.textColor.dark,
    }
}));
export default function ChipPostTag({ label }) {
    return (
        <CustomChipPostTag label={label} />
    );
}
