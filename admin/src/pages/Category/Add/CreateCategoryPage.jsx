import React, { useEffect, useState } from "react";
import "./style.css";
import InputEdit from "../../../components/common/TextField/InputEdit";
import ButtonNormal from "../../../components/common/Button/ButtonNormal";
import { Box, FormHelperText, Grid } from "@mui/material";
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import SelectEdit from "../../../components/common/Select/SelectEdit";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAsync, fetchCategoriesAsync } from "../../../redux/slices/categoriesSlice";
import InfoBox from "../../../components/common/Box/InforBox";
import ImageDropZone from "../../../components/common/DropZoneUpload/DropZoneImage";
import styled from "@emotion/styled";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storageFirebase } from "../../../config/firebaseConfig";
import { v4 } from "uuid";
import Loading from "../../../components/common/Loading/Loading";
import ButtonUploadImg from "../../../components/common/Button/ButtonUploadImg";
import color from "../../../config/colorConfig";
import LinearIndeterminate from "../../../components/common/Loading/LoadingLine";
import BasicAlertl from "../../../components/common/Alert/BasicAlertl";

const DivMargin = styled.div(({ theme }) => ({
  paddingBottom: '24px',
}));



export default function CreateCategoryPage() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.data);
  const error = useSelector((state) => state.categories.error);
  const status = useSelector((state) => state.categories.status);
  const statusCreate = useSelector((state) => state.categories.statusCreate);
  // Access categories from Redux store
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState('');

  const [parent_id, setParentId] = useState('');

  useEffect(() => {
    if (status == 'idle') {
      dispatch(fetchCategoriesAsync());
    }

  }, [status])
  useEffect(() => {
    if (statusCreate == 'loading') {
        setLoadingUpload(true);
    }
    if (statusCreate == 'created successfully') {
        setLoadingUpload(false);
    }

}, [statusCreate])
  useEffect(() => {
    if (error === 'The name has already been taken.' && status === 'failed') {
      setErrorName('Tên phân loại đã tồn tại');
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
  }, [status]);

  //add upload 
  const [success, setSeccess] = useState(false);
  const [thumbnail, setThumbnail] = useState('');
  const [thumbnailPreview, setThumbnailPreview] = useState('');

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [successUpload, setSuccessUpload] = useState(false);

  const [errorUpload, setErrorUpload] = useState(false);

  const handleUploadThumnail = (name) => {
    const thumbnailRef = ref(storageFirebase, `categories/${name}/${v4()}`);
    const uploadTask = uploadBytesResumable(thumbnailRef, thumbnail);
    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            setLoadingUpload(true);
            setSuccessUpload(false);
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setLoadingUpload(false);
          const data = {
            name: name,
            parent_id: parent_id ? parent_id : null,
            icon_url: downloadURL
          }
          dispatch(createCategoryAsync({ data }));
          setSuccessUpload(true);
        });
      }
    );
  };

  const handleUploadFile = (file) => {
    setThumbnail(file);
    const imageUrl = URL.createObjectURL(file);
    setThumbnailPreview(imageUrl);
  }
  const handleCreateCategory = () => {
    console.log(handleCheckError('name', name) );
    if (handleCheckError('name', name) && thumbnail !== '') {
      handleUploadThumnail(name);
      setErrorUpload(false);
    }
    else {
      if (thumbnail === '') {
        setErrorUpload('Ảnh không được để trống!');

      }
    }
  }
  const handleCheckError = (field, value) => {
    switch (field) {
      case 'name': {
        if (value === '') {
            setErrorName('Phân loại không được để trống!');
            return false;
        }
        else if (value.length > 128) {
            setErrorName('Phân loại không được quá 128 kí tự!');
            return false;
        }
        else if (categories.find((category) => category.name.toLowerCase() === value.trim().toLowerCase())) {
            setErrorName('Phân loại không được trùng!');
            return false;
        }
        else {
            setErrorName('');
            return true;
        }
    }
        break;

    default:
        return false; // Default to no error
    }
  };
  if (status === 'succeeded') {
    return (
      <Box>
        {successUpload ? <BasicAlertl label={'Tải ảnh lên thành công'} severity={'success'} /> : null}
        {statusCreate == 'created successfully' ? <BasicAlertl label={'Tạo phân loại thành công'} severity={'success'} /> : null}
        {loadingUpload ? <LinearIndeterminate /> : null}
        <HeaderPage
          namePage={"Tạo mới"}
          Breadcrumb={["Phân loại", "Tạo"]}
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
                label={'Phân loại'}
                error={errorName ? true : false}
                helperText={errorName}
              />
  
            </DivMargin>
            <DivMargin>
              <SelectEdit
                label={'Phân loại cha'}
                data={categories}
                value={''}
                onChange={(e) => {
                  setParentId(e.target.value)
                }}
                nullData={true}
              />
            </DivMargin>
            <DivMargin>
              <DivMargin>
                <Grid container>
                  <Grid item xs={3}>
                    <ButtonUploadImg handleOnChange={handleUploadFile} />
                  </Grid>
                  <Grid item xs={9}>
                    {thumbnailPreview ? <img src={thumbnailPreview} alt="Selected" style={{ maxWidth: '100%' }} /> : null}
                    <FormHelperText sx={{
                      color: color.textColor.error
                    }}>{errorUpload ? errorUpload : null}</FormHelperText>
                  </Grid>
                </Grid>
              </DivMargin>
  
            </DivMargin>
            <DivMargin>
              <ButtonNormal bg={'true'} label={'Thêm'} onClick={handleCreateCategory} />
            </DivMargin>
          </InfoBox>
        </Box>
      </Box>
    );
  }
 
}
