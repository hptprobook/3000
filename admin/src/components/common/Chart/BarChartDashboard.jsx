import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import color from "../../../config/colorConfig";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
    '1 Ngày ',
    '2 Ngày ',
    '3 Ngày ',
    '4 Ngày ',
    '5 Ngày ',
    '6 Ngày ',
    '7 Ngày ',
];
const orders = [
    { id: 1, date: '2023-12-01', amount: 100 },
    { id: 2, date: '2023-12-02', amount: 150 },
    { id: 3, date: '2023-12-02', amount: 200 },
    // ... other orders
];

// Function to group orders by date and get day of the week
const groupOrdersByDate = (orders) => {
    const groupedOrders = {};

    orders.forEach((order) => {
        const date = new Date(order.date);
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

        if (!groupedOrders[date.toISOString()]) {
            groupedOrders[date.toISOString()] = {
                date: date.toISOString(),
                dayOfWeek,
                orders: [order],
            };
        } else {
            groupedOrders[date.toISOString()].orders.push(order);
        }
    });

    return Object.values(groupedOrders);
};

// Group orders by date
const groupedOrders = groupOrdersByDate(orders);

// Log the result
console.log(groupedOrders);

export default function BarChartDashboard() {
    return (
        <BarChart
            height={360}
            series={[
                { data: pData, label: 'pv', id: 'pvId', color: 'blue' },
                { data: uData, label: 'uv', id: 'uvId', color: 'green' },
            ]}
            xAxis={[{ data: xLabels, scaleType: 'band' }]}
            sx={{
                '.MuiChartsAxis-directionY': {
                    display: 'none',
                },
                '.MuiChartsAxis-tick , .MuiChartsAxis-line': {
                    display: 'none',
                },
                '.MuiChartsAxis-tickLabel tspan': {
                    fill: color.textColor.dark,
                }
            }}
        />
    );
}
