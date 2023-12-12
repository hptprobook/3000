import * as React from 'react';

import color from "../../../config/colorConfig";
import './style.css';
import { ListCardOrder } from './ListCardOrder';
export default function CardOrder({ data }) {
    console.log(data);
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
                        <ListCardOrder title={'Họ và tên'} content={data.address.name} border={'true'} />
                    </li>
                    <li>
                        <ListCardOrder title={''} content={'Tin'} border={'true'} />
                    </li>
                    <li>
                        <ListCardOrder title={'Name'} content={'Tin'} border={'true'} />
                    </li>
                    <li>
                        <ListCardOrder title={'Name'} content={'Tin'} border={'true'} />
                    </li>
                    <li>
                        <ListCardOrder title={'Name'} content={'Tin'} border={'true'} />
                    </li>
                </ul>
            </div>
        </div>
    );
}
