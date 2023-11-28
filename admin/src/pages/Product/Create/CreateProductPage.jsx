import React from "react";
import { Box, Grid, Typography, colors } from "@mui/material";
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import TinyEditor from "../../../components/common/TinyEditor/TinyEditor";
import TinyEditorMini from "../../../components/common/TinyEditor/TinyEditorMini";

import styled from "@emotion/styled";
import color from "../../../config/colorConfig";
import InputEdit from "../../../components/common/TextField/InputEdit";
import InfoBox from "../../../components/common/Box/InforBox";
import SelectEdit from "../../../components/common/Select/SelectEdit";
import SelectCategoryCreate from "../../../components/common/Select/SelectCategoryCreate";

const DivMargin = styled.div(({ theme }) => ({
    paddingBottom: '24px',
}));
export default function CreateProductPage() {
    return (
        <Box>
            <HeaderPage
                namePage={"Tạo mới"}
                Breadcrumb={["Sản phẩm", "Tạo"]}
            />
            <Box sx={{
                marginTop: '32px'
            }}>
                <InfoBox title="Thông tin cơ bản">
                    <DivMargin>
                        <InputEdit
                            label={'Tên sản phẩm'}
                        />
                    </DivMargin>
                    <DivMargin>
                        <InputEdit
                            label={'Số lượng'}
                            type='number'
                        />
                    </DivMargin>
                    <DivMargin>
                        <InputEdit
                            label={'Giá tiền'}
                            type='number'
                        />
                    </DivMargin>
                    <DivMargin>
                        <InputEdit
                            label={'Discount'}
                            type='number'
                        />
                    </DivMargin>
                </InfoBox>
                <InfoBox title="Phân loại">
                    <DivMargin>
                        <SelectEdit
                            label={'Phân loại'}
                            data={[
                                { id: 'male', name: 'Nam' },
                                { id: 'female', name: 'Nữ' },
                                { id: 'other', name: 'Khác' },
                            ]}
                            value={'male'}
                        />
                    </DivMargin>
                    <DivMargin>
                        <SelectEdit
                            label={'Nhãn hàng'}
                            data={[
                                { id: 'male', name: 'Nam' },
                                { id: 'female', name: 'Nữ' },
                                { id: 'other', name: 'Khác' },
                            ]}
                            value={'male'}
                        />
                    </DivMargin>
                    <DivMargin>
                        <SelectCategoryCreate />
                    </DivMargin>
                </InfoBox>
                <InfoBox title="Mô tả">
                    <DivMargin
                        style={{
                            marginTop: '12px'
                        }}
                    >
                        <Typography
                            variant="p"
                            component="p"
                            sx={{
                                marginBottom: '12px',
                                color: color.textGray
                            }}
                        >
                            Mô tả ngắn
                        </Typography>
                        <TinyEditorMini />
                    </DivMargin>
                    <div
                        style={{
                            marginTop: '12px'
                        }}
                    >
                        <Typography
                            variant="p"
                            component="p"
                            sx={{
                                marginBottom: '12px',
                                color: color.textGray
                            }}
                        >
                            Chi tiết
                        </Typography>
                        <TinyEditor />
                    </div>
                </InfoBox>
            </Box>
        </Box>
    );
}
