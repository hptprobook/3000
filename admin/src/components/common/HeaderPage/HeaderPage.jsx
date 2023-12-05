import { Box, Typography } from '@mui/material'
import React from 'react'
import ButtonAdd from '../Button/ButtonAdd'
import ButtonExport from '../Button/ButtonExport'
import Breadcrumb from '../Breadcrumb/Breadcrumb'

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
                <Breadcrumb link={propCustom.Breadcrumb} />
            </div>
            {propCustom.ButtonLink ? (
                <ButtonAdd link={propCustom.ButtonLink} />
            ) : (
                <></>
            )}


        </Box>
    )
}

export default HeaderPage
