import React, { useEffect, useState } from "react";
import { Box, Grid, colors } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/common/Loading/Loading";
import HeaderDashBoard from "../../components/common/HeaderPage/HeaderDashBoard";
import ButtonNormal from "../../components/common/Button/ButtonNormal";

import "./style.css";
import { FaAngleRight } from "react-icons/fa6";
import { fetchAllOrders } from "../../redux/slices/ordersSlice";
import { useNavigate } from "react-router-dom";
import BarChartDashboard from "../../components/common/Chart/BarChartDashboard";
import BarChartDashboardMoney from "../../components/common/Chart/BarChartDashboardMoney";
import { getBasicReport } from "../../redux/slices/reportSlice";
import ReportRevenue from "../../components/common/Chart/ReportRevenue";
import ReportOrder from "../../components/common/Chart/ReportOrder";

export default function HomePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders.data);
    const statusOrder = useSelector((state) => state.orders.status);
    const [loadData, setLoadData] = useState(false);
    const [orderList, setOrderList] = React.useState([]);
    const [countPending, setCountPending] = React.useState(0);
    const [reportData, setReportData] = React.useState({});

    const { reports, error } = useSelector((state) => state.reports);

    function formatCurrencyToMillions(vnd) {
        const millions = vnd / 1000000;

        const formatted = millions.toLocaleString("it-IT", {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
        });

        return `${formatted} M`;
    }

    useEffect(() => {
        if (loadData === false) {
            dispatch(fetchAllOrders());
            dispatch(getBasicReport());
            if (reports) {
                setReportData(reports);
            }
        }
    }, [loadData]);

    useEffect(() => {
        if (statusOrder === "success") {
            let count = 0;
            orders.forEach((order) => {
                if (order.status === "pending") {
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
    if (statusOrder === "loading") {
        return <Loading />;
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
                        <Grid item md={3} sm={12}>
                            <div className="DashboardCard">
                                <div className="DashboardCardContent">
                                    <img
                                        src="../../src/assets/img/dashboard/iconly-glass-tick.svg"
                                        alt=""
                                    />
                                    <div className="DashboardCardContentSub">
                                        <p>Doanh thu</p>
                                        <h4>
                                            {formatCurrencyToMillions(
                                                reportData?.orderTotalAmount
                                            )}
                                        </h4>
                                    </div>
                                </div>
                                <hr />
                                <div className="DashboardCardFooter">
                                    <ButtonNormal
                                        label={"Đi tới đơn hàng"}
                                        icon={<FaAngleRight />}
                                        onClick={(e) => handleRedect("/order")}
                                    />
                                </div>
                            </div>
                        </Grid>
                        <Grid item md={3} sm={12}>
                            <div className="DashboardCard">
                                <div className="DashboardCardContent">
                                    <img
                                        src="../../src/assets/img/dashboard/iconly-glass-tick.svg"
                                        alt=""
                                    />
                                    <div className="DashboardCardContentSub">
                                        <p>Đơn hàng thành công</p>
                                        <h4>{reportData?.orderSuccessCount}</h4>
                                    </div>
                                </div>
                                <hr />
                                <div className="DashboardCardFooter">
                                    <ButtonNormal
                                        label={"Đi tới đơn hàng"}
                                        icon={<FaAngleRight />}
                                        onClick={(e) => handleRedect("/order")}
                                    />
                                </div>
                            </div>
                        </Grid>
                        <Grid item md={3} sm={12}>
                            <div className="DashboardCard">
                                <div className="DashboardCardContent">
                                    <img
                                        src="../../src/assets/img/dashboard/iconly-glass-paper.svg"
                                        alt=""
                                    />
                                    <div className="DashboardCardContentSub">
                                        <p>Đơn hàng chưa xử lý</p>
                                        <h4>{reportData?.orderPendingCount}</h4>
                                    </div>
                                </div>
                                <hr />
                                <div className="DashboardCardFooter">
                                    <ButtonNormal
                                        label={"Đi tới đơn hàng"}
                                        icon={<FaAngleRight />}
                                        onClick={(e) => handleRedect("/order")}
                                    />
                                </div>
                            </div>
                        </Grid>

                        <Grid item md={3} sm={12}>
                            <div className="DashboardCard">
                                <div className="DashboardCardContent">
                                    <img
                                        src="../../src/assets/img/dashboard/iconly-glass-paper.svg"
                                        alt=""
                                    />
                                    <div className="DashboardCardContentSub">
                                        <p>Đơn hàng bị hủy</p>
                                        <h4>
                                            {reportData?.orderCancelledCount}
                                        </h4>
                                    </div>
                                </div>
                                <hr />
                                <div className="DashboardCardFooter">
                                    <ButtonNormal
                                        label={"Đi tới đơn hàng"}
                                        icon={<FaAngleRight />}
                                        onClick={(e) => handleRedect("/order")}
                                    />
                                </div>
                            </div>
                        </Grid>
                        <Grid item md={6} sm={12}>
                            <div className="DashboardCard DashboardOrderChart">
                                <BarChartDashboard data={orderList} />
                            </div>
                        </Grid>
                        <Grid item md={6} sm={12}>
                            <div className="DashboardCard DashboardOrderChart">
                                <BarChartDashboardMoney data={orderList} />
                            </div>
                        </Grid>
                        <Grid item md={6}>
                            <div className="DashboardCard DashboardOrderChart">
                                <ReportRevenue />
                            </div>
                        </Grid>
                        <Grid item md={6}>
                            <div className="DashboardCard DashboardOrderChart">
                                <ReportOrder />
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        );
    }
}
