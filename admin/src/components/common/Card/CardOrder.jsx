import * as React from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import color from '../../../config/colorConfig';
import { Divider, Typography } from '@mui/material';

const OderPaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    backgroundColor: color.backgroundColorSub.dark,
    color: color.textColor.dark,
    ...theme.typography.body2,
    textAlign: 'left',
    borderRadius: '14px',
    marginTop: '32px'
}));

const TextCard = styled(Typography)(({ theme }) => ({
    padding: '16px',
}));
const CustomHr = styled(hr)(({ theme }) => ({

}));
export default function CardOrder() {
    return (
        <OderPaper variant="elevation">
            <div style={{ paddingTop: '16px', }}>
                <TextCard variant="h6" component="h2" sx={{ color: color.textColor.dark, }}>
                    Thông tin cơ bản
                </TextCard>
            </div>
            <CustomHr />
            <div style={{ paddingBottom: '16px', }}>
                <TextCard variant="h6" component="h2" sx={{ color: color.textColor.dark, }}>
                    Thông tin cơ bản
                </TextCard>
            </div>
        </OderPaper>
    );
}
