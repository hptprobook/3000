import { Box, Typography } from '@mui/material'
import React from 'react'
import ButtonAdd from '../Button/ButtonAdd'
import ButtonExport from '../Button/ButtonExport'

const HeaderPage = (propCustom) => {
    return (
        <Box sx={{ width: '100%', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <Typography variant="h4" sx={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif !important',
                    fontWeight: 600,
                    fontSize: '30px'
                }} gutterBottom>
                    {propCustom.namePage}
                </Typography>
                <ButtonExport />
                <ButtonExport />
            </div>
            <ButtonAdd />

        </Box>
    )
}

export default HeaderPage
