import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, colors } from "@mui/material";
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import styled from "@emotion/styled";
import InputEdit from "../../../components/common/TextField/InputEdit";
import InfoBox from "../../../components/common/Box/InforBox";
import SelectEdit from "../../../components/common/Select/SelectEdit";
import { useDispatch, useSelector } from "react-redux";
import ButtonNormal from "../../../components/common/Button/ButtonNormal";
import * as Yup from "yup";
import { useFormik } from "formik";
import BasicAlertl from "../../../components/common/Alert/BasicAlertl";
import LinearIndeterminate from "../../../components/common/Loading/LoadingLine";
import { createCoupon, fetchCouponById, resetState, updateCouponByID } from "../../../redux/slices/couponsSlice";
import { useParams } from "react-router-dom";
import Loading from "../../../components/common/Loading/Loading";


const DivMargin = styled.div(({ theme }) => ({
    paddingBottom: '24px',
}));
const productSchema = Yup.object().shape({
    code: Yup.string()
        .required("Mã giảm giá không được để trống")
        .min(3, "Giá trị không hợp lệ")
        .max(20, "Mã giảm giá không vượt quá 20 ký tự"),
    description: Yup.string()
        .required("Số lượng không được để trống")
        .max(128, "Mô tả không vượt quá 128 ký tự"),
    start_date: Yup.date()
        .required("Ngày hiệu lực không được trống"),
    end_date: Yup.date()
        .min(Yup.ref('start_date'), 'Ngày hết hạn phải sau ngày hiệu lực')
        .required("Ngày hết hạn không được trống"),
    quantity: Yup.number()
        .required("Số lượng không được để trống!")
        .positive("Số lượng phải là số dương")
        .max(1000, "Số lượng không quá 1000"),
    amount: Yup.number()
        .required("Giá trị không được trống")
        .min(0, "Giá trị không thể nhỏ hơn 0")
        .max(4294967295, "Giá trị quá lớn"),
    type: Yup.string()
        .required("Phân loại mã giảm giá không được trống")
});
export default function EditCouponPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const error = useSelector((state) => state.coupons.errorUpdate);
    const errorFetch = useSelector((state) => state.coupons.errorFetch);
    const status = useSelector((state) => state.coupons.statusUpdate);
    const coupon = useSelector((state) => state.coupons.dataFetch);
    const statusFetch = useSelector((state) => state.coupons.statusFetch);

    // const dataCreate = useSelector((state) => state.products.dataCreate);
    const [successUpdate, setSuccessUpdate] = useState(false);
    const [errorUpdate, setErrorUpdate] = useState(false);
    const [dataCoupon, setDataCoupon] = useState('');
    const [loadingData, setLoadingData] = useState(true);
    useEffect(() => {
        if (id) {
            dispatch(fetchCouponById({ id: id }));
        }
    }, [id])
    useEffect(() => {
        if (statusFetch == 'success') {
            setDataCoupon(coupon);
            setLoadingData(false);
            formik.setValues({
                code: coupon.code,
                amount: coupon.amount,
                description: coupon.description,
                quantity: coupon.quantity,
                end_date: coupon.end_date,
                start_date: coupon.start_date,
                type: coupon.type,
            });
        }
    }, [statusFetch]);
    const formatDateToShortDate = (dateString) => {
        const date = new Date(dateString);

        if (isNaN(date.getTime())) {
            return dateString;
        }

        const year = date.getFullYear().toString(); // Get the last two digits of the year
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed
        const day = date.getDate().toString().padStart(2, '0');

        return `${year}/${month}/${day}`;
    };


    const formik = useFormik({
        validationSchema: productSchema,
        onSubmit: (values) => {
            values.start_date = formatDateToShortDate(values.start_date);
            values.end_date = formatDateToShortDate(values.end_date);
            setErrorUpdate('');
            setSuccessUpdate(false);
            dispatch(updateCouponByID({ id: id, data: values }))
        },
    });
    useEffect(() => {
        if (error == 'The code has already been taken.') {
            dispatch(resetState());
            setSuccessUpdate(false);
            setErrorUpdate('Mã giảm giá không được trùng');
        }
    }, [error]);
    useEffect(() => {
        if (status == 'success') {
            dispatch(resetState());
            setSuccessUpdate(true);
            setErrorUpdate('');
        }
    }, [status]);
    if (loadingData) {
        return (
            <Loading />
        )
    }
    if (errorFetch) {
        return (
            <div>
                error
            </div>
        )
    }
    if (!loadingData) {
        return (
            <Box>
                {successUpdate ? <BasicAlertl label={'Cập nhật mã giảm giá thành công'} severity={'success'} /> : null}
                {status == 'loading' ? <LinearIndeterminate /> : null}
                {/* {statusUpdate == 'loading' ? <LinearIndeterminate /> : null} */}
                {errorUpdate != '' ? <BasicAlertl label={errorUpdate} severity={'error'} /> : null}

                <HeaderPage
                    namePage={"Tạo mới"}
                    Breadcrumb={["Sản phẩm", "Tạo"]}
                />
                <Box sx={{
                    marginTop: '32px'
                }}>
                    <form onSubmit={formik.handleSubmit}>
                        <InfoBox title="Thông tin cơ bản">
                            <DivMargin>
                                <InputEdit
                                    id={'code'}
                                    label={'Mã giảm giá'}
                                    value={formik.values.code}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    name={'code'}
                                    error={
                                        formik.touched.code &&
                                        Boolean(formik.errors.code)
                                    }
                                    helperText={
                                        formik.touched.code && formik.errors.code
                                    }
                                />
                            </DivMargin>
                            <DivMargin>
                                <InputEdit
                                    id={'quantity'}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    label={'Số lượng'}
                                    name={'quantity'}
                                    value={formik.values.quantity}
                                    error={
                                        formik.touched.quantity &&
                                        Boolean(formik.errors.quantity)
                                    }
                                    helperText={
                                        formik.touched.quantity && formik.errors.quantity
                                    }
                                />
                            </DivMargin>
                            <DivMargin>
                                <InputEdit
                                    id={'description'}
                                    label={'Mô tả'}
                                    value={formik.values.description}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    name={'description'}
                                    error={
                                        formik.touched.description &&
                                        Boolean(formik.errors.description)
                                    }
                                    helperText={
                                        formik.touched.description && formik.errors.description
                                    }
                                />
                            </DivMargin>


                        </InfoBox>
                        <InfoBox title="Giá trị">
                            <DivMargin>
                                <SelectEdit
                                    label={'Phân loại'}
                                    data={[
                                        { id: 'direct', name: 'Giảm trực tiếp' },
                                        { id: 'ship', name: 'Giảm giá ship' },
                                        { id: 'percent', name: 'Giảm theo phần trăm' }
                                    ]}
                                    value={formik.values.type}
                                    name={'type'}
                                    id={'type'}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                />
                            </DivMargin>
                            <DivMargin>
                                <InputEdit
                                    id={'amount'}
                                    label={'Giá trị'}
                                    value={formik.values.amount}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    name={'amount'}
                                    error={
                                        formik.touched.amount &&
                                        Boolean(formik.errors.amount)
                                    }
                                    helperText={
                                        formik.touched.amount && formik.errors.amount
                                    }
                                />
                            </DivMargin>
                            <DivMargin>
                                <InputEdit
                                    id={'start_date'}
                                    label={'Ngày hiệu lực'}
                                    value={formik.values.start_date}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    name={'start_date'}
                                    type='date'
                                    error={
                                        formik.touched.start_date &&
                                        Boolean(formik.errors.start_date)
                                    }
                                    helperText={
                                        formik.touched.start_date && formik.errors.start_date
                                    }
                                />
                            </DivMargin>
                            <DivMargin>
                                <InputEdit
                                    id={'end_date'}
                                    label={'Ngày hết hạn'}
                                    value={formik.values.end_date}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    name={'end_date'}
                                    type="date"
                                    error={
                                        formik.touched.end_date &&
                                        Boolean(formik.errors.end_date)
                                    }
                                    helperText={
                                        formik.touched.end_date && formik.errors.end_date
                                    }
                                />
                            </DivMargin>
                        </InfoBox>
                        <DivMargin
                            style={{
                                marginTop: '12px',
                                float: 'right'
                            }}
                        >
                            <ButtonNormal label={'Hủy'} />
                            <ButtonNormal label={'Tạo'} type={'submit'} bg={'true'} />
                        </DivMargin>
                    </form>

                </Box>
            </Box>
        );
    }
}
