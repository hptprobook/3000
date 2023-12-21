import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import color from "../../../config/colorConfig";

export default function BarChartDashboardMoney({ data }) {
    // Function to format the date as 'DD/MM' in the ICT time zone
    const formatDayMonth = (date) => {
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: 'Asia/Ho_Chi_Minh'
        };
        return date.toLocaleString('en-US', options).replace(/\//g, '-').split('-').join('/');
    };
    const formatDay = (date) => {
        const options = {
            day: '2-digit',
            timeZone: 'Asia/Ho_Chi_Minh'
        };
        return date.toLocaleString('en-US', options).replace(/\//g, '-').split('-').reverse().join('/');
    };

    const today = new Date();
    const currentMonth = today.getMonth();
    const daysInMonth = new Date(today.getFullYear(), currentMonth + 1, 0).getDate();

    // Create an array to store the labels for the current month divided into 4 weeks
    const xLabels = [];
    const xLabel = [];
    for (let week = 0; week < 5; week++) {
        const weekStart = week * 7 + 1;
        const weekEnd = Math.min((week + 1) * 7, daysInMonth);

        if (weekStart <= daysInMonth) {
            const startDate = new Date(today.getFullYear(), currentMonth, weekStart);
            const endDate = new Date(today.getFullYear(), currentMonth, Math.min(weekEnd, daysInMonth));

            // Use startDate and endDate to label the week
            xLabels.push(`${formatDayMonth(startDate)} - ${formatDayMonth(endDate)}`);
            xLabel.push(`${formatDay(startDate)} - ${formatDay(endDate)}`); // You can modify this as needed
        }
    }


    const orderTotal = {
        total: Array(4).fill(0), // 4 weeks * 7 days = 28
    };
    for (let i = 0; i < xLabels.length; i++) {
        const [startPart, endPart] = xLabels[i].split(' - ');
        const rangeStartDate = formatDayMonth(startPart);
        const rangeEndDate = formatDayMonth(endPart);
        data.forEach(order => {
            const orderDate = new Date(order.created_at); // Assuming 'created_at' is a valid date string in ISO format
            const formattedOrderDate = formatDayMonth(orderDate); // Use the same format as xLabel
            if (formattedOrderDate >= rangeStartDate && formattedOrderDate <= rangeEndDate) {
                const orderStatus = order.status;
                const orderTotalAmount = order.total_amount;
                if (orderStatus === 'delivered') {
                    orderTotal.total[i] = orderTotal.total[i] + orderTotalAmount;
                }
            }
        });
    }
    const pData = orderTotal.total;

    return (
        <BarChart
            height={360}
            series={[
                { data: pData, label: 'Doanh thu tháng ' + (currentMonth + 1), id: 'pvId', color: '#312e81', type: 'bar' },
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
