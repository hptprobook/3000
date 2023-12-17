import * as React from 'react';

import color from "../../../config/colorConfig";
import './style.css';
import { ListCardOrder } from './ListCardOrder';
import FormatVND from '../Function/FormatVND';
import FormatDate from '../Function/FormatDate';

export default function CardOrder({ data, status }) {
    return (
        <div className='OrderPaper' style={{ backgroundColor: color.backgroundColorSub.dark }}>
            <div
                className="OrderPaperHeader"
                style={{
                    borderBottom: '1px solid' + color.borderColor.dark,
                }}
            >
                <p>
                    Thông tin cơ bản
                </p>
            </div>
            <div className="OrderPaperContent">
                <ul>
                    <li>
                        <ListCardOrder title={'Họ và tên'} content={data.address.name} />
                    </li>
                    <li>
                        <ListCardOrder title={'Địa chỉ'} content={data.address.address_info} />
                    </li>
                    <li>
                        <ListCardOrder title={'Số điện thoại'} content={data.address.phone} />
                    </li>
                    <li>
                        <ListCardOrder title={'Tổng tiền'} content={FormatVND(data.total_amount)} />
                    </li>
                    <li>
                        <ListCardOrder title={'Ngày tạo'} content={FormatDate(data.created_at)} />
                    </li>
                    <li>
                        <ListCardOrder title={'Trạng thái'} status={status} />
                    </li>
                </ul>
            </div>
        </div>
    );
}
