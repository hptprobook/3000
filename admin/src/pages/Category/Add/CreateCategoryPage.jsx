import React, { useEffect, useState } from "react";
import "./style.css";
import InputEdit from "../../../components/common/TextField/InputEdit";
import ButtonNormal from "../../../components/common/Button/ButtonNormal";
import { Box, Grid } from "@mui/material";
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import SelectEdit from "../../../components/common/Select/SelectEdit";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAsync } from "../../../redux/slices/categoriesSlice";
import InfoBox from "../../../components/common/Box/InforBox";
import ImageDropZone from "../../../components/common/DropZoneUpload/DropZoneImage";
import styled from "@emotion/styled";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storageFirebase } from "../../../config/firebaseConfig";
import { v4 } from "uuid";

const DivMargin = styled.div(({ theme }) => ({
  paddingBottom: '24px',
}));



export default function CreateCategoryPage() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.data); // Access categories from Redux store
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState('');

  const [errorParentId, setErrorParentId] = useState('');

  const [categoryData, setCategoryData] = useState({
    name: "",
    parent_id: null,
    icon_url: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here.

    // Clear the form fields after submission if needed.
    setCategoryData({
      name: "",
      parent_id: null,
      icon_url: "",
    });
  };

  useEffect(() => {
    // Fetch categories when the component mounts
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  const handleCheckError = (field, value) => {
    switch (field) {
      case 'name': {
        if (value === '') {
          setErrorName('Tên phân loại không được để trống!');
        } else if (value.length > 254) {
          setErrorName('Tên phân loại không được quá 255 kí tự!');
        } else {
          setErrorName('');
        }
      }
        break;
        case 'parent_id': {
          if (!value || value === 'none') {
              setErrorParentId('Không chọn');
          } else if (categories.length === 0) {
              setErrorParentId('Lỗi');
          } else {
              setErrorParentId('');
          }
      }
      break;
      // ... other cases if needed
    }
  };

  //add upload 
  const [thumbnail, setThumbnail] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  const handleUploadThumnail = (name) => {
    const thumbnailRef = ref(storageFirebase, `category_image/${name}/${v4()}`);
    const uploadTask = uploadBytesResumable(thumbnailRef, thumbnail);
    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setThumbnailUrl(downloadURL);
        });
      }
    );
  };


  return (
    <Box>
      <HeaderPage
        namePage={"Tạo mới"}
        Breadcrumb={["Phân loại", "Tạo"]}
      />
      <Box sx={{
        marginTop: '32px'
      }}></Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputEdit
              label="Tên"
              value={name}
              onBlur={(event) => {
                setName(event.target.value);
                handleCheckError('name', event.target.value);
              }}
              // ... other props
              error={errorName ? true : false}
              helperText={errorName}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectEdit
              label={'Phân loại cha'}
              data={categories}
              value={categoryData.parent_id}
              onChange={(event) => {
                setCategoryData({
                  ...categoryData,
                  parent_id: event.target.value,
                });
                handleCheckError('parent_id', event.target.value);
              }}
              // ... other props
              error={errorParentId ? true : false}
              helperText={errorParentId}
            />
          </Grid>
          <Grid item xs={12}>
            <InfoBox title="Hình ảnh icon">
              <DivMargin>
                {thumbnail ? <img src={thumbnailUrl} alt="Thumbnail" /> : <p>No thumbnail available</p>}
                <input type="file" onChange={(e) => setThumbnail(e.target.files[0])} />
                <button onClick={(e) => handleUploadThumnail('giap')}>upload</button>
                {/* <ImageDropZone /> */}
              </DivMargin>
            </InfoBox>
          </Grid>
          <Grid item xs={12}>
            <ButtonNormal
              variant="contained"
              label={"Thêm"}
              bg="true"
              type="submit"
              sx={{ marginTop: "16px" }}
            ></ButtonNormal>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
