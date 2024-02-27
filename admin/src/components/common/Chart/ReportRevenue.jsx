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
import { getAmountReportToChart } from "../../../redux/slices/reportSlice";

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
            text: "Doanh thu",
        },
    },
};

export default function ReportRevenue() {
    const [timePeriod, setTimePeriod] = useState("monthly");
    const dispatch = useDispatch();
    const [data, setData] = useState({ labels: [], datasets: [] });
    const { amountReports } = useSelector((state) => state.reports);

    useEffect(() => {
        dispatch(getAmountReportToChart({ period: timePeriod }));
    }, [dispatch, timePeriod]);

    useEffect(() => {
        if (amountReports && amountReports.length > 0) {
            let labels;
            if (timePeriod === "monthly") {
                labels = amountReports.map(
                    (item) => `T${item.month}, ${item.year}`
                );
            } else if (timePeriod === "quarterly") {
                labels = amountReports.map(
                    (item) => `Quý ${item.quarter}, ${item.year}`
                );
            } else if (timePeriod === "yearly") {
                labels = amountReports.map((item) => `Năm ${item.year}`);
            }

            const totalDelivered = amountReports.map(
                (item) => item.totalDelivered
            );
            const expectedRevenue = amountReports.map(
                (item) => item.expectedRevenue
            );

            setData({
                labels,
                datasets: [
                    {
                        label: "Doanh thu thực tế",
                        data: totalDelivered,
                        borderColor: "rgb(75, 192, 192)",
                        backgroundColor: "rgba(75, 192, 192, 0.5)",
                    },
                    {
                        label: "Doanh thu dự kiến",
                        data: expectedRevenue,
                        borderColor: "rgb(255, 99, 132)",
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                    },
                ],
            });
        }
    }, [amountReports, timePeriod]);

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
