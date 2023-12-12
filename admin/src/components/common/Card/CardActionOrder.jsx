import { Grid } from '@mui/material'
import React from 'react'
import color from '../../../config/colorConfig'
import ButtonNormal from '../Button/ButtonNormal'

export const CardActionOrder = () => {
    return (
        <div className='CardActionOrder' style={{ backgroundColor: color.backgroundColorSub.dark }}>
            <Grid container>
                <Grid item xs={12} md={9}>
                    <p style={{ color: color.textColor.dark }}>Xử lý đơn hàng</p>
                </Grid>
                <Grid item xs={12} md={3}>
                    <div style={{ float: 'right' }}>
                        <ButtonNormal label={'Sẵn sàng giáo'} bg={'true'} />

                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
