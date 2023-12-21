import React, { useEffect, useState } from "react";
import { Box, Grid, colors } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/common/Loading/Loading";
import HeaderDashBoard from "../../components/common/HeaderPage/HeaderDashBoard";
import ButtonNormal from "../../components/common/Button/ButtonNormal";

import './style.css';
import { FaAngleRight } from "react-icons/fa6";
import { fetchAllOrders } from "../../redux/slices/ordersSlice";
import { useNavigate } from "react-router-dom";
import BarChartDashboard from "../../components/common/Chart/BarChartDashboard";
import BarChartDashboardMoney from "../../components/common/Chart/BarChartDashboardMoney";

export default function HomePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders.data);
    const statusOrder = useSelector((state) => state.orders.status);
    const error = useSelector((state) => state.categories.error);
    const [loadData, setLoadData] = useState(false);
    const [orderList, setOrderList] = React.useState([]);
    const [countPending, setCountPending] = React.useState(0);
    useEffect(() => {
        if (loadData === false) {
            dispatch(fetchAllOrders());
        }
    }, [loadData]);
    useEffect(() => {
        if (statusOrder == 'success') {
            let count = 0;
            orders.forEach(order => {
                if (order.status === 'pending') {
                    count++;
                }
            });
            setCountPending(count);
            setOrderList(orders);
            setLoadData(true);
        }
    }, [statusOrder]);
    const handleRedect = (link) => {
        navigate(link);
    };
    if (statusOrder == 'loading') {
        return (
            <Loading />
        )
    }
    if (loadData) {
        return (
            <Box>
                <HeaderDashBoard />
                <Box
                    sx={{
                        width: "100%",
                        mt: "16px",
                    }}
                >
                    <Grid container spacing={4}>
                        <Grid item md={4} sm={12}>
                            <div className="DashboardCard">
                                <div className="DashboardCardContent">
                                    <img src="../../src/assets/img/dashboard/iconly-glass-info.svg" alt="" />
                                    <div className="DashboardCardContentSub">
                                        <p>Đơn hàng chưa xử lý</p>
                                        <h4>{countPending}</h4>
                                    </div>
                                </div>
                                <hr />
                                <div className="DashboardCardFooter">
                                    <ButtonNormal label={'Đi tới đơn hàng'} icon={<FaAngleRight />} onClick={(e) => handleRedect('/order')} />
                                </div>
                            </div>
                        </Grid>
                        <Grid item md={4} sm={12}>
                            <div className="DashboardCard">
                                <div className="DashboardCardContent">
                                    <img src="../../src/assets/img/dashboard/iconly-glass-paper.svg" alt="" />
                                    <div className="DashboardCardContentSub">
                                        <p>Nhiệm vụ cần làm</p>
                                        <h4>41</h4>
                                    </div>
                                </div>
                                <hr />
                                <div className="DashboardCardFooter">
                                    <ButtonNormal label={'Đi tới nhiệm vụ'} icon={<FaAngleRight />} />
                                </div>
                            </div>
                        </Grid>
                        <Grid item md={4} sm={12}>
                            <div className="DashboardCard">
                                <div className="DashboardCardContent">
                                    <img src="../../src/assets/img/dashboard/iconly-glass-tick.svg" alt="" />
                                    <div className="DashboardCardContentSub">
                                        <p>Yêu cầu người dùng</p>
                                        <h4>41</h4>
                                    </div>
                                </div>
                                <hr />
                                <div className="DashboardCardFooter">
                                    <ButtonNormal label={'Đi tới người dùng'} icon={<FaAngleRight />} />
                                </div>
                            </div>
                        </Grid>
                        <Grid item md={7} sm={12}>
                            <div className="DashboardCard DashboardOrderChart">
                                <BarChartDashboard data={orderList} />
                            </div>
                        </Grid>
                        <Grid item md={5} sm={12}>
                            <div className="DashboardCard DashboardOrderChart">
                                <BarChartDashboardMoney data={orderList} />

                            </div>
                        </Grid>
                    </Grid>

                </Box>
            </Box>
        );
    }
}

