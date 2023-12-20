import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCategoryByID, fetchCategoriesAsync } from "../../../redux/slices/categoriesSlice";
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import Loading from "../../../components/common/Loading/Loading";
import { Box, Divider, Grid, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import TableDataCategory from "../../../components/common/Table/TableDataCategory";
import InputSearch from "../../../components/common/TextField/InputSearch";
import LinearIndeterminate from "../../../components/common/Loading/LoadingLine";
import TableCategory from "../../../components/common/Table/TableCategory";
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
    const categories = useSelector((state) => state.categories.data);
    //status
    const status = useSelector((state) => state.categories.status);
    const error = useSelector((state) => state.categories.error);
    const statusDelete = useSelector((state) => state.categories.statusDelete);
    const [loadData, setLoadData] = useState(false);
    //reset data
    const [dataCategories, setDataCategories] = useState([]);
    useEffect(() => {
        if (loadData == false) {
            dispatch(fetchCategoriesAsync());
        }
    }, [loadData]);
    useEffect(() => {
        if (status == 'succeeded') {
            setDataCategories(categories);
            setLoadData(true);
        }
    }, [status]);
    useEffect(() => {
        if (statusDelete == 'delete success') {
            setLoadData(false);
        }
    }, [statusDelete]);
    if (status === "loading") {
        return <Loading />;
    }

    if (status === "failed") {
        return <div>Error: {error}</div>;
    }
    if (status === "succeeded") {
        return (
            <div>
                {statusDelete === 'loading delete' ? <LinearIndeterminate /> : null}
                <HeaderPage
                    namePage={'Phân loại'}
                    Breadcrumb={['Phân loại', 'Danh sách']}
                    ButtonLink='/category/create' />
                <TableCategory data={categories}></TableCategory>
            </div>
        );
    }

};

export default ListCategoriesPage;
