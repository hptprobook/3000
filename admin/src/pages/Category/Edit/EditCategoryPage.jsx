import { Box, Grid, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ButtonBackFullW from '~/components/common/Button/ButtonBackFullW';
import styled from '@emotion/styled';
import color from '~/config/colorConfig';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '~/components/common/Loading/Loading';
import InputEdit from '~/components/common/TextField/InputEdit';
import ButtonNormal from '~/components/common/Button/ButtonNormal';
import { fetchCategoryById } from "~/redux/slices/categoriesSlice";
import ModalAddress from '../../../components/common/Modal/ModalAddress';

const ButtonEdit = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: color.backgroundColorSub2.dark,
    '& svg': {
        color: color.textColor.dark
    }
}))

const EditCategoryPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [loadData, setLoadData] = useState(false);
    const [name, setName] = useState('');
    const [parentId, setParentId] = useState('');
    const [iconUrl, setIconUrl] = useState('');
    
    const category = useSelector((state) => state.categories.selectedCategory);
    const status = useSelector((state) => state.categories.status);
    useEffect(() => {
        if (!loadData) {
            dispatch(fetchCategoryById(id))
                .then((result) => {
                    // Xử lý dữ liệu được trả về từ API ở đây
                    console.log('Data from API:', result);
                })
                .catch((error) => {
                    // Xử lý lỗi nếu có
                    console.error('Error fetching data:', error);
                });
            setLoadData(true);
        }
    }, [loadData, dispatch, id]);

    const handleCloseModal = () => {
        // Đóng modal nếu cần
    };

    const handleEditCategory = () => {
        // Thực hiện logic cập nhật danh mục với các giá trị mới của name, parentId và iconUrl
        console.log({ name, parentId, iconUrl });

    };

    if (status === "loading") {
        return <Loading />;
    }

    if (status === "failed") {
        return <div>Error:</div>;
    }

      
    if (loadData) {
        console.log(category)
        return (
            <Box sx={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
                <ModalAddress openModal={false} handleClose={handleCloseModal} />
                <ButtonBackFullW label={'Trở lại'} />

                <Box sx={{
                    flexGrow: 1,
                    padding: '32px',
                    marginTop: '32px',
                    backgroundColor: color.backgroundColorSub.dark,
                    borderRadius: '14px'
                }} >
                    <Typography sx={{ color: color.textColor.dark, fontSize: '16px' }}>
                        Chỉnh sửa
                    </Typography>
                    <Grid container spacing={4} sx={{ paddingTop: '32px' }}>
                        <Grid item sm={12} md={6} lg={4}>
                            <InputEdit
                                label={'Tên'}
                                value={category.name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} lg={4}>
                            <InputEdit
                                label={'Parent ID'}
                                value={category.parent_id}
                                onChange={(e) => setParentId(e.target.value)}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} lg={4}>
                            <InputEdit
                                label={'Icon URL'}
                                value={category.icon_url}
                                onChange={(e) => setIconUrl(e.target.value)}
                            />
                        </Grid>
                    </Grid>

                    <Box sx={{
                        flexGrow: 1,
                        marginTop: '32px',
                        backgroundColor: color.backgroundColorSub.dark,
                        borderRadius: '14px'
                    }} >
                        <ButtonNormal label={'Cập nhật'} bg='true' onClick={handleEditCategory} />
                        <ButtonNormal label={'Hủy'} />
                    </Box>
                </Box>
            </Box>
        )
    }

    // Nếu không có dữ liệu, bạn có thể thực hiện một xử lý khác ở đây
    return null;
}

export default EditCategoryPage;
