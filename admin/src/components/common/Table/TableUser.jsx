import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import InputSearch from '../TextField/InputSearch';
import { Divider, Grid } from '@mui/material';
import TableDataUser from './TableDataUser';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Tableuser() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', mt: '16px', backgroundColor: '#111927', borderRadius: '13px' }}>
            <Box sx={{ padding: '0 12px' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="Bảng người dùng"
                    textColor='inherit'
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        color: '#A0AEC0 !important',
                        fontSize: '12px !important',
                        '& .Mui-selected': {
                            color: 'rgb(99, 102, 241) !important',
                        },
                        '& .MuiButtonBase-root': {
                            minWidth: '0px !important',
                            fontSize: '14px',
                            textTransform: 'none !important',
                            margin: '0px 8px',
                            padding: '0px 16px',
                        },
                        '& .MuiTouchRipple-root': {
                            boderColor: 'rgb(99, 102, 241)'
                        }
                    }}

                >
                    <Tab label="Tất cả" {...a11yProps(0)} />
                    <Tab label="Đang hoạt động" {...a11yProps(1)} />
                    <Tab label="Cấm" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <Divider sx={{ borderColor: '#fff' }} />
            <Grid container spacing={0} sx={{ padding: '32px 0', margin: 0 }}>
                <Grid item xs={12} sx={{ p: '0 12px' }}>
                    <InputSearch />
                </Grid>
            </Grid>
            <CustomTabPanel value={value} index={0}>
                <TableDataUser />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                Item Two
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                Item Three
            </CustomTabPanel>
        </Box>
    );
}
