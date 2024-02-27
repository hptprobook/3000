import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Box } from "@mui/material";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getOrderReportToChart } from "../../../redux/slices/reportSlice";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Đơn hàng",
        },
    },
};

export default function ReportOrder() {
    const [timePeriod, setTimePeriod] = useState("monthly");
    const dispatch = useDispatch();
    const [data, setData] = useState({ labels: [], datasets: [] });
    const { orderReports } = useSelector((state) => state.reports);

    useEffect(() => {
        dispatch(getOrderReportToChart({ period: timePeriod }));
    }, [dispatch, timePeriod]);

    useEffect(() => {
        if (orderReports && orderReports.length > 0) {
            let labels;
            if (timePeriod === "monthly") {
                labels = orderReports.map(
                    (item) => `Tháng ${item.month}, ${item.year}`
                );
            } else if (timePeriod === "quarterly") {
                labels = orderReports.map(
                    (item) => `Quý ${item.quarter}, ${item.year}`
                );
            } else if (timePeriod === "yearly") {
                labels = orderReports.map((item) => `Năm ${item.year}`);
            }

            const deliveredCounts = orderReports.map(
                (item) => item.deliveredCount
            );
            const cancelledCounts = orderReports.map(
                (item) => item.cancelledCount
            );

            setData({
                labels,
                datasets: [
                    {
                        label: "Đơn hàng thành công",
                        data: deliveredCounts,
                        borderColor: "rgb(75, 192, 192)",
                        backgroundColor: "rgba(75, 192, 192, 0.5)",
                    },
                    {
                        label: "Đơn hàng bị hủy",
                        data: cancelledCounts,
                        borderColor: "rgb(255, 99, 132)",
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                    },
                ],
            });
        }
    }, [orderReports, timePeriod]);

    return (
        <>
            <Box
                sx={{
                    ml: 4,
                }}
            >
                <Button
                    size="small"
                    sx={{
                        mr: 1,
                    }}
                    variant="outlined"
                    onClick={() => setTimePeriod("monthly")}
                >
                    Tháng
                </Button>
                <Button
                    size="small"
                    sx={{
                        mr: 1,
                    }}
                    variant="outlined"
                    onClick={() => setTimePeriod("quarterly")}
                >
                    Quý
                </Button>
                <Button
                    size="small"
                    sx={{
                        mr: 1,
                    }}
                    variant="outlined"
                    onClick={() => setTimePeriod("yearly")}
                >
                    Năm
                </Button>
            </Box>
            <Line options={options} data={data} />
        </>
    );
}
