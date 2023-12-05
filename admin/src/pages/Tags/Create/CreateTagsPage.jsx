import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import styled from "@emotion/styled";
import InputEdit from "../../../components/common/TextField/InputEdit";
import InfoBox from "../../../components/common/Box/InforBox";
import { useDispatch, useSelector } from "react-redux";
import ButtonNormal from "../../../components/common/Button/ButtonNormal";
import { createTag, setStatus } from "../../../redux/slices/tagsSlice";
import LinearIndeterminate from "../../../components/common/Loading/LoadingLine";
import SuccessAlert from "../../../components/common/Alert/SuccessAlert";

const DivMargin = styled.div(({ theme }) => ({
    paddingBottom: '24px',
}));
export default function CreateTagsPage() {

    // khai báo các hàm liên quan đến fecth data 
    const dispatch = useDispatch();

    const error = useSelector((state) => state.tags.errorCreate);
    const tags = useSelector((state) => state.tags.create);
    const status = useSelector((state) => state.tags.status);

    const [name, setName] = useState('');
    const [errorName, setErrorName] = useState('');

    const [description, setDescription] = useState('');
    const [errorDescription, setErrorDescription] = useState('');

    const [success, setSeccess] = useState(false);


    useEffect(() => {
        if (error === 'The name has already been taken.' && status === 'failed') {
            setErrorName('Nhãn sản phẩm đã tồn tại');
            setSeccess(false);
        }

    }, [error, status])
    useEffect(() => {
        if (status === 'created successfully') {
            setSeccess(true);
        }
        if (status === 'loading') {
            setSeccess(false);
        }
    }, [status])
    const handleCreateTags = () => {
        if (name !== '' && description !== '') {
            const data = {
                name: name,
                description: description
            }
            // console.log(data);
            dispatch(createTag({ data: data }));
        }
        else {
            if (name === '') {
                setErrorName('Nhãn sản phẩm không được để trống!');
            }
            else {
                setErrorDescription('Mô tả nhãn không được để trống!');
            }
        }
    }

    const handleCheckError = (field, value) => {
        switch (field) {
            case 'name': {
                if (value === '') {
                    setErrorName('Nhãn sản phẩm không được để trống!');
                }
                else if (value.length > 128) {
                    setErrorName('Nhãn sản phẩm không được quá 128 kí tự!');
                }
                else {
                    setErrorName('');
                }
            }
                break;
            case 'description': {
                if (value === '') {
                    setErrorDescription('Mô tả nhãn không được để trống!');
                }
                else if (value.length > 128) {
                    setErrorDescription('Mô tả nhãn không được quá 128 kí tự!');
                }
                else {
                    setErrorDescription('');
                }
            }
                break;

            default:
                return false; // Default to no error
        }
    };

    return (
        <Box>
            {success ? <SuccessAlert label={'Tạo nhãn sản phẩm thành công'} /> : null}
            {status === 'loading' ? <LinearIndeterminate /> : null}
            <HeaderPage
                namePage={"Tạo mới"}
                Breadcrumb={["Nhãn sản phẩm", "Tạo"]}
            />
            <Box sx={{
                marginTop: '32px'
            }}>
                <InfoBox title="Thông tin">
                    <DivMargin>
                        <InputEdit
                            id={'name'}
                            onBlur={(event) => {
                                setName(event.target.value);
                                handleCheckError('name', event.target.value)
                            }}
                            label={'Nhãn sản phẩm'}
                            error={errorName ? true : false}
                            helperText={errorName}
                        />

                    </DivMargin>
                    <DivMargin>
                        <InputEdit
                            id={'description'}
                            onBlur={(event) => {
                                setDescription(event.target.value);
                                handleCheckError('description', event.target.value)
                            }}
                            label={'Mô tả ngắn'}
                            error={errorDescription ? true : false}
                            helperText={errorDescription}
                        />

                    </DivMargin>
                    <DivMargin>
                        <ButtonNormal bg={'true'} label={'Thêm'} onClick={handleCreateTags} />

                    </DivMargin>
                </InfoBox>
            </Box>
        </Box>
    );
}

