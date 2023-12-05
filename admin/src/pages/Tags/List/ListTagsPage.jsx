import React, { useEffect, useState } from "react";
import { Box, colors } from "@mui/material";
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import color from "../../../config/colorConfig";
import InputSearch from "../../../components/common/TextField/InputSearch";
import { useDispatch, useSelector } from "react-redux";
import TableTags from "../../../components/common/Table/TableTags";
import Loading from "../../../components/common/Loading/Loading";
import { deleteTagByID, fetchAllTags, setStatus } from "../../../redux/slices/tagsSlice";
import LinearIndeterminate from "../../../components/common/Loading/LoadingLine";


export default function ListTagsPage() {
    const dispatch = useDispatch();
    const error = useSelector((state) => state.tags.error);
    const tags = useSelector((state) => state.tags.tags);
    const status = useSelector((state) => state.tags.status);
    const dataReturn = useSelector((state) => state.tags.delete);
    const statusDelete = useSelector((state) => state.tags.statusDelete);
    const [dataTags, setDataTags] = useState([]);
    const [loadData, setLoadData] = useState(false);
    useEffect(() => {
        if (loadData == false) {
            dispatch(fetchAllTags());
        }
    }, [loadData]);
    useEffect(() => {
        if (status == 'succeeded tags') {
            setDataTags(tags);
            setLoadData(true);
        }
    }, [status]);
    useEffect(() => {
        if (statusDelete == 'delete successful') {
            setLoadData(false);
        }
    }, [statusDelete]);
    const handleDeleteTag = (value) => {
        dispatch(deleteTagByID({ id: value }));
    }
    const handleSearch = (searchValue) => {
        const regex = new RegExp(searchValue, 'i'); // 'i' để không phân biệt hoa thường
        const result = tags.filter(item => regex.test(item.name));
        setDataTags(result);
        if (searchValue === '') {
            setDataTags(tags);
        }
    };

    if (status === 'loading') {
        return (
            <Loading />
        )
    }
    if (status === 'failed') {
        return (
            <div>Error</div>
        )
    }
    if (status === 'succeeded tags') {
        return (
            <Box>
                {statusDelete === 'loading delete' ? <LinearIndeterminate /> : null}

                <HeaderPage
                    namePage={"Nhãn sản phẩm"}
                    Breadcrumb={["Nhãn sản phẩm", "Danh sách"]}
                    ButtonLink="/category/tag/create"
                />
                <Box
                    sx={{
                        width: "100%",
                        mt: "16px",
                        backgroundColor: color.backgroundColorSub.dark,
                        borderRadius: "13px",
                    }}
                >
                    <Box sx={{ padding: "32px 0 0" }}>
                        <Box
                            sx={{
                                padding: "0 16px 16px",
                                borderBottom:
                                    "1px solid " + color.colorHover.hoverGray,
                            }}
                        >
                            <InputSearch onChange={handleSearch} />
                        </Box>
                        <TableTags data={dataTags} onDeleteTag={handleDeleteTag} />
                    </Box>
                </Box>
            </Box>
        );
    }

}
