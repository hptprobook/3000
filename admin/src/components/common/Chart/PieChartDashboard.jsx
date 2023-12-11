import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function PieChartDashboard() {
    return (
        <PieChart
            series={[
                {
                    data: [
                        { id: 0, value: 10, label: 'Chưa xử lý' },
                        { id: 1, value: 15, label: 'Hoàn thành' },
                        { id: 2, value: 20, label: 'Hủy' },
                    ],
                },
            ]}
            height={200}
        />
    );
}
