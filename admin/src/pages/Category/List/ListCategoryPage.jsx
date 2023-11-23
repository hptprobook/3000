import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategoriesAsync } from "../../../redux/slices/categoriesSlice";
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import Loading from "../../../components/common/Loading/Loading";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import TableDataCategory from "../../../components/common/Table/TableDataCategory";
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

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

const ListCategoriesPage = () => {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState(0); // Initialize value state for tabs
    const categories = useSelector((state) => state.categories.data);
    const status = useSelector((state) => state.categories.status);
    const error = useSelector((state) => state.categories.error);

    useEffect(() => {
        dispatch(fetchCategoriesAsync());
    }, [dispatch]);


    const handleChange = (event, newValue) => {
        setValue(newValue); // Update the value state when a tab is changed
    };
    if (status === "loading") {
        return <Loading />;
    }

    if (status === "failed") {
        return <div>Error: {error}</div>;
    }

    // Ensure categories is an array before mapping
    const categoriesArray = Array.isArray(categories) ? categories : [];

    const rows = categoriesArray.map((category) => ({
        id: category.id,
        name: category.name,
        icon_url: category.icon_url,
        // Add other fields as needed
    }));

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'icon_url', headerName: 'Icon URL', width: 150 },
        // Define other columns based on your data structure
    ];


    return (
        <div>
            <HeaderPage
                namePage={'Phân loại'}
                Breadcrumb={['Phân loại', 'Danh sách']}
                ButtonLink='/category/create' />
            {/* Render the categories data in a table, list, or any other desired format */}
            {/* For example, you can map through categoriesArray to display them */}
            <Box sx={{ width: '100%', mt: '16px', backgroundColor: '#111927', borderRadius: '13px' }}>
                <Box sx={{ padding: '0 12px' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="Bảng phân loại"
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

                <CustomTabPanel index={0} value={value}>
                    <TableDataCategory data={categories} />
                </CustomTabPanel>
                <CustomTabPanel align='center' colSpan={7} index={1} value={value}>
                    trống
                </CustomTabPanel>
                <CustomTabPanel align='center' colSpan={7} index={2} value={value}>
                    trống
                </CustomTabPanel>


            </Box>
        </div>
    );
};

export default ListCategoriesPage;
