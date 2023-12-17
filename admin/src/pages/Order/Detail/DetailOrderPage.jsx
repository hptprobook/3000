import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ButtonBackFullW from '~/components/common/Button/ButtonBackFullW';
import HeaderOrderDetail from '~/components/common/HeaderPage/HeaderOrderDetail';

import { fetchOneOrder, resetState, updateStatusOrder } from '../../../redux/slices/ordersSlice';
import { useParams } from 'react-router-dom';
import Loading from '../../../components/common/Loading/Loading';
import CardOrder from '../../../components/common/Card/CardOrder';
import TableOrderProducts from '../../../components/common/Table/TableOrderProducts';
import LinearIndeterminate from '../../../components/common/Loading/LoadingLine';
import SuccessAlert from '../../../components/common/Alert/SuccessAlert';

export const DetailOrderPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const order = useSelector((state) => state.orders.order);
    const status = useSelector((state) => state.orders.statusFetchOne);
    const error = useSelector((state) => state.orders.errorOne);
    const statusUpdate = useSelector((state) => state.orders.statusUpdate);
    const dataReturn = useSelector((state) => state.orders.orderUpdate);
    const [successAlert, setSuccessAlert] = useState(false);
    const [statusOrder, setStatusOrder] = useState('');
    useEffect(() => {
        if (id) {
            dispatch(fetchOneOrder({ id }));
        }
    }, [id]);
    useEffect(() => {
        if (status == 'success') {
            setStatusOrder(order.status);
        }
    }, [status]);
    useEffect(() => {
        if (statusUpdate === 'success') {
            setSuccessAlert(true);
            dispatch(resetState());
            setStatusOrder(dataReturn.status);
        }
        if (statusUpdate === 'loading') {
            setSuccessAlert(false);
        }
    }, [statusUpdate]);
    const handleUpdateStatus = (data) => {
        const dataUpdate = {
            status: data,
        }
        dispatch(updateStatusOrder({ id: id, data: dataUpdate }));
    }
    if (status == 'loading') {
        return (
            <Loading />
        )
    }
    if (status == 'success') {
        return (
            <Box>
                {successAlert ? <SuccessAlert label={'Cập nhật đơn hàng thành công'} /> : null}
                {statusUpdate === 'loading' ? <LinearIndeterminate /> : null}
                <ButtonBackFullW label={'Đơn hàng'} />
                <HeaderOrderDetail label={'Đơn hàng'} create_at={order.created_at} handleUpdateStatus={handleUpdateStatus} status={statusOrder} />
                <CardOrder data={order} status={statusOrder} />
                <TableOrderProducts data={order.order_details} />
            </Box>
        )
    }
}
