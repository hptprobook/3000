import React from 'react';
import Grid from '@mui/material/Grid';
import color from '../../../config/colorConfig';
import { ChipStatusOrder } from '../Chip/ChipStatusOrder';

export const ListCardOrder = ({ title, content, status = '' }) => {
    return (
        <div className='ListCardOrder'>
            <Grid container>
                <Grid item xs={12} md={2}>
                    <h6 style={{ color: color.textColor.dark }}>{title}</h6>
                </Grid>
                <Grid item xs={12} md={10}>
                    {content ? <p style={{ color: color.textColor.gray }}>{content}</p> : <ChipStatusOrder status={status} />}
                </Grid>
            </Grid>
        </div>
    )
}
