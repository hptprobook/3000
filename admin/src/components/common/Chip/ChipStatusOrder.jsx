import { Chip } from '@mui/material'
import React from 'react'

export const ChipStatusOrder = ({ status }) => {
    const [color, setColor] = React.useState('rgb(6, 174, 212)');
    const [colorBg, setColorBg] = React.useState('rgba(6, 174, 212, 0.12)');
    const [label, setLabel] = React.useState('Trạng thái');

    React.useEffect(() => {
        switch (status) {
            case 'pending': {
                setLabel('Chưa giải quyết');
                setColor('rgb(6, 174, 212)');
                setColorBg('rgba(6, 174, 212, 0.12)');
            }
                break;
            case 'processing': {
                setLabel('Đang xử lý');
                setColor('rgb(6, 174, 212)');
                setColorBg('rgba(6, 174, 212, 0.12)');
            }
                break;
            case 'shipping': {
                setLabel('Đang giao');
                setColor('rgb(6, 174, 212)');
                setColorBg('rgba(6, 174, 212, 0.12)');
            }
                break;
            case 'delivered': {
                setLabel('Đã nhận hàng');
                setColor('rgb(16, 185, 129)');
                setColorBg('rgba(16, 185, 129, 0.12)');
            }
                break;
            case 'cancelled': {
                setLabel('Đơn hủy');
                setColor('rgb(240, 68, 56)');
                setColorBg('rgba(240, 68, 56, 0.12)');
            }
                break;
            case 'refunded': {
                setLabel('Hoàn hàng');
                setColor('rgb(247, 144, 9)');
                setColorBg('rgba(247, 144, 9, 0.12)');
            }
                break;
        }
    }, [status])
    return (
        <Chip
            sx={{
                backgroundColor: colorBg,
                color: color,
                textTransform: 'uppercase',
                fontWeight: '500',
                fontSize: '12px'
            }}
            label={label} />
    )
}
