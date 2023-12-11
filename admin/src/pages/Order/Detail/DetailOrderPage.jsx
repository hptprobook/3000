import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ButtonBackFullW from '~/components/common/Button/ButtonBackFullW';
import { fetchOneOrder } from '../../../redux/slices/ordersSlice';
import { useParams } from 'react-router-dom';
import Loading from '../../../components/common/Loading/Loading';

export const DetailOrderPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const order = useSelector((state) => state.orders.order);
    const status = useSelector((state) => state.orders.statusFetchOne);
    const error = useSelector((state) => state.orders.errorOne);
    useEffect(() => {
        if (id) {
            dispatch(fetchOneOrder({ id }));
        }
    }, [id]);
    console.log(order);
    if (status == 'loading') {
        return (
            <Loading />
        )
    }
    if (status == 'success') {
        return (
            <Box>
                <ButtonBackFullW label={'Đơn hàng'} />
            </Box>
        )
    }
}
