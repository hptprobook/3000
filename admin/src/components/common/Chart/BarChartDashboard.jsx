import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import color from "../../../config/colorConfig";



export default function BarChartDashboard({ data }) {

    // Function to format the date as 'DD/MM' in the ICT time zone
    const formatDayMonth = (date) => {
        const options = {
            day: '2-digit',
            year: 'numeric',
            month: '2-digit',
            timeZone: 'Asia/Ho_Chi_Minh'
        };
        return date.toLocaleString('en-US', options).replace(/\//g, '-').split('-').reverse().join('/');
    };
    const formatDayMonthNoYear = (date) => {
        const options = {
            day: '2-digit',
            month: '2-digit',
            timeZone: 'Asia/Ho_Chi_Minh'
        };
        return date.toLocaleString('en-US', options).replace(/\//g, '-').split('-').reverse().join('/');
    };

    // Create an array to store the labels for the 8th day to the current day in the ICT time zone
    const xLabels = [];
    const xLabel = [];

    const today = new Date();

    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        xLabels.unshift(formatDayMonth(date));
        xLabel.unshift(formatDayMonthNoYear(date));
    }

    const orderStats = {
        delivered: Array(7).fill(0),
        orderCreate: Array(7).fill(0),
    };

    // Duyệt qua mảng orders để đếm số lượng đơn hàng cho mỗi ngày và trạng thái
    data.forEach(order => {
        const orderDate = formatDayMonth(new Date(order.created_at)); // Format the order date consistently

        // Tìm vị trí của ngày trong xLabels
        const index = xLabels.indexOf(orderDate);

        // Nếu ngày có trong xLabels
        if (index !== -1) {
            // Tăng số lượng đơn hàng cho ngày đó và trạng thái tương ứng
            if (order.status === 'delivered') {
                orderStats.delivered[index]++;
            } else {
                orderStats.orderCreate[index]++;
            }
        }
    });


    const uData = orderStats.delivered;
    const pData = orderStats.orderCreate;

    return (
        <BarChart
            height={360}
            series={[
                { data: pData, label: 'Tất cả đơn', id: 'pvId', color: '#312e81', type: 'bar' },
                { data: uData, label: 'Đơn hoàn thành', id: 'uvId', color: '#6366f1', type: 'bar' },
            ]}
            xAxis={[{ data: xLabel, scaleType: 'band' }]}
            sx={{
                '.MuiChartsAxis-directionY': {
                    display: 'none',
                },
                '.MuiChartsAxis-tick , .MuiChartsAxis-line': {
                    display: 'none',
                },
                '.MuiChartsAxis-tickLabel tspan': {
                    fill: color.textColor.dark,
                },
                '.MuiChartsLegend-series tspan': {
                    fill: color.textColor.dark,
                }
            }}
        />
    );
}
