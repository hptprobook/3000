import React, { useEffect, useState } from "react";
import "./style.css";
import InputEdit from "../../../components/common/TextField/InputEdit";
import ButtonNormal from "../../../components/common/Button/ButtonNormal";
import { Box, Grid } from "@mui/material";
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

const DivMargin = styled.div(({ theme }) => ({
  paddingBottom: '24px',
}));



export default function CreateCategoryPage() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.data);
  const dataReturn = useSelector((state) => state.categories.newCategory);
  const status = useSelector((state) => state.categories.status) // Access categories from Redux store
  // Access categories from Redux store
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState('');

  const [errorParentId, setErrorParentId] = useState('');

  const [categoryData, setCategoryData] = useState({
    name: "",
    parent_id: null,
    icon_url: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(categoryData);
    const errors = validateForm(); // Kiểm tra điều kiện và trả về danh sách lỗi (nếu có)

    if (errors.length === 0) {
      try {
        // Dispatch action to create category and await the result
        const resultAction = dispatch(createCategoryAsync(categoryData));
        if (status === 'created successfully') {
          console.log(dataReturn);

        }
        resultAction.then((action) => {
          console.log('New category added:', action.payload);
          alert("Tạo thành công"); // Check if action.payload holds the new category data
        }).catch((error) => {
          console.error('Error adding new category:', error);
          // Handle error if needed
        });

        // Reset form fields after successful submission
        resetFormFields();
      } catch (error) {
        console.error('Error adding new category:', error);
        // Handle error if needed
        alert("Tạo không thành công");
      }
    } else {
      console.log(errors);
      alert("Vui lòng điền đầy đủ thông tin");
      // Display validation error messages to the user
    }
  };

  const validateForm = () => {
    const errors = [];

    // Kiểm tra các điều kiện và thêm lỗi vào mảng errors nếu dữ liệu không hợp lệ
    if (name === '') {
      errors.push('Tên phân loại không được để trống!');
    } else if (name.length > 254) {
      errors.push('Tên phân loại không được quá 255 kí tự!');
    }

    if (!categoryData.parent_id || categoryData.parent_id === 'none') {
      errors.push('Không chọn phân loại cha');
    } else if (categories.length === 0) {
      errors.push('Lỗi khi lấy danh sách phân loại cha');
    }

    if (!thumbnailUrl) {
      errors.push('Chưa upload hình ảnh');
    }

    // ... Kiểm tra các trường dữ liệu khác nếu cần

    return errors;
  };

  const resetFormFields = () => {
    // Reset các trường dữ liệu và thông báo lỗi sau khi gửi thành công
    setCategoryData({
      name: '',
      parent_id: null,
      icon_url: '',
    });
    setName('');
    setThumbnail('');
    setThumbnailUrl('');
    setErrorName('');
    setErrorParentId('');
    // ... Reset các thông báo lỗi khác nếu có
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
          // Update categoryData with the URL
          setCategoryData({
            ...categoryData,
            icon_url: downloadURL,
          });
          // Also, update the thumbnailUrl state if needed
          setThumbnailUrl(downloadURL);
        });
      }
    );
  };

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }
  return (
    <Box>
      <HeaderPage
        namePage={"Tạo mới"}
        Breadcrumb={["Phân loại", "Tạo"]}
      />
      <Box sx={{
        marginTop: '32px'
      }}></Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputEdit
            label="Tên"
            value={name}
            onBlur={(event) => {

              const newName = event.target.value;
              setName(newName); // Set the name state
              setCategoryData({
                ...categoryData,
                name: newName, // Set the name in categoryData
              });
              handleCheckError('name', newName);
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
            onClick={handleSubmit}
          ></ButtonNormal>
        </Grid>
      </Grid>
    </Box>
  );
}
