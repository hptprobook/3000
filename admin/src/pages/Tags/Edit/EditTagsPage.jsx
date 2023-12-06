import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import styled from "@emotion/styled";
import InputEdit from "../../../components/common/TextField/InputEdit";
import InfoBox from "../../../components/common/Box/InforBox";
import { useDispatch, useSelector } from "react-redux";
import ButtonNormal from "../../../components/common/Button/ButtonNormal";
import { createTag, fetchOneById, setStatus, updateTagByID } from "../../../redux/slices/tagsSlice";
import LinearIndeterminate from "../../../components/common/Loading/LoadingLine";
import SuccessAlert from "../../../components/common/Alert/SuccessAlert";
import { useParams } from "react-router-dom";
import Loading from "../../../components/common/Loading/Loading";

const DivMargin = styled.div(({ theme }) => ({
    paddingBottom: '24px',
}));
export default function EditTagsPage() {
    const { id } = useParams();
    // khai báo các hàm liên quan đến fecth data 
    const dispatch = useDispatch();

    const error = useSelector((state) => state.tags.error);
    const tag = useSelector((state) => state.tags.getOne);
    const status = useSelector((state) => state.tags.status);
    const statusUpdate = useSelector((state) => state.tags.statusUpdate);

    const [name, setName] = useState('');
    const [errorName, setErrorName] = useState('');

    const [description, setDescription] = useState('');
    const [errorDescription, setErrorDescription] = useState('');

    const [success, setSeccess] = useState(false);
    useEffect(() => {
        if (status !== 'tag already') {
            dispatch(fetchOneById({ id: id }));
        }
    }, [status])
    useEffect(() => {
        if (error === 'The name has already been taken.' && statusUpdate === 'update failed') {
            setErrorName('Nhãn sản phẩm đã tồn tại');
            setSeccess(false);
        }

    }, [error, statusUpdate])
    useEffect(() => {
        if (status === 'tag already') {
            setName(tag.name);
            setDescription(tag.description);
        }
    }, [status])
    useEffect(() => {
        if (statusUpdate === 'update successful') {
            setSeccess(true);
        }
        if (statusUpdate === 'loading update') {
            setSeccess(false);
        }
    }, [statusUpdate])
    const handleEditTags = () => {
        if (name !== '' && description !== '') {
            const data = {
                name: name,
                description: description
            }
            // console.log(data);
            dispatch(updateTagByID({ id: id, data: data }));
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

    if (status === 'loading') {
        return (
            <Loading />
        )
    }
    if (status == 'tag already') {
        return (
            <Box>
                {success ? <SuccessAlert label={'Cập nhật nhãn sản phẩm thành công'} /> : null}
                {statusUpdate === 'loading update' ? <LinearIndeterminate /> : null}
                <HeaderPage
                    namePage={"Chỉnh sửa"}
                    Breadcrumb={["Nhãn sản phẩm", "Chỉnh sửa"]}
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
                                value={tag.name}
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
                                value={tag.description}
                                label={'Mô tả ngắn'}
                                error={errorDescription ? true : false}
                                helperText={errorDescription}
                            />

                        </DivMargin>
                        <DivMargin>
                            <ButtonNormal bg={'true'} label={'Lưu'} onClick={handleEditTags} />

                        </DivMargin>
                    </InfoBox>
                </Box>
            </Box>
        );
    }
}

