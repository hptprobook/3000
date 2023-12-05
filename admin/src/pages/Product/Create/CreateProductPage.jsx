import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, colors } from "@mui/material";
import HeaderPage from "../../../components/common/HeaderPage/HeaderPage";
import TinyEditor from "../../../components/common/TinyEditor/TinyEditor";
import TinyEditorMini from "../../../components/common/TinyEditor/TinyEditorMini";
import { storageFirebase } from "../../../config/firebaseConfig";
import styled from "@emotion/styled";
import color from "../../../config/colorConfig";
import InputEdit from "../../../components/common/TextField/InputEdit";
import InfoBox from "../../../components/common/Box/InforBox";
import SelectEdit from "../../../components/common/Select/SelectEdit";
import { v4 } from 'uuid';
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import ImageDropZone from "../../../components/common/DropZoneUpload/DropZoneImage";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAsync } from "../../../redux/slices/categoriesSlice";
import Loading from "../../../components/common/Loading/Loading";
import { fetchAllBrands } from "../../../redux/slices/brandsSlice";
import { fetchAllTags } from "../../../redux/slices/tagsSlice";
import AutoFillTag from "../../../components/common/AutoCompelete/AutoFillTag";

const DivMargin = styled.div(({ theme }) => ({
    paddingBottom: '24px',
}));
export default function CreateProductPage() {

    // khai báo các hàm liên quan đến fecth data 
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.data);
    const brands = useSelector((state) => state.brands.data);
    const tags = useSelector((state) => state.tags.tags);
    const statusLoad = useSelector((state) => state.categories.status);
    const statusLoadBrands = useSelector((state) => state.brands.status);
    const statusLoadTags = useSelector((state) => state.tags.status);

    const error = useSelector((state) => state.users.error);

    // khai báo các hàm liên quan đế dữ liệu lấy về 
    const [parentCategories, setParentCategories] = useState([]);
    const [childCategories, setChildCategories] = useState([]);
    const [selectBrands, setSelectBrands] = useState([]);


    // khai báo các hàm liên quan đến dữ liệu
    const [thumbnail, setThumbnail] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [creatError, setCreateError] = useState(true);

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedErrorCategory, setSelectedErrorCategory] = useState('');

    const [selectedCategoryChild, setSelectedCategoryChild] = useState('');
    const [selectedErrorCategoryChild, setSelectedErrorCategoryChild] = useState('');

    const [name, setName] = useState('');
    const [errorName, setErrorName] = useState('');

    const [quantity, setQuantity] = useState('');
    const [errorQuantity, setErrorQuantity] = useState('');

    const [price, setPrice] = useState('');
    const [errorPrice, setErrorPrice] = useState('');

    const [discount, setDiscount] = useState('');
    const [errorDiscount, setErrorDiscount] = useState('');

    const [description, setDescription] = useState('');

    // lấy dữ liệu về category và tag
    useEffect(() => {
        dispatch(fetchCategoriesAsync());
    }, [dispatch]);
    useEffect(() => {
        if (statusLoad === 'succeeded') {
            dispatch(fetchAllBrands());
        }
    }, [statusLoad]);
    useEffect(() => {
        if (statusLoadBrands == 'brands is ready') {
            dispatch(fetchAllTags());
        }
    }, [statusLoadBrands]);

    useEffect(() => {
        const parent = categories.filter(item => item.parent_id == 0);
        setParentCategories(parent);
    }, [categories]);

    useEffect(() => {
        const child = categories.filter(item => item.parent_id == selectedCategory);
        setChildCategories(child);
    }, [selectedCategory]);

    // hande check error input
    const handleCheckError = (field, value) => {
        switch (field) {
            case 'name': {
                if (value === '') {
                    setErrorName('Tên sản phẩm không được để trống!');
                }
                else if (value.length > 254) {
                    setErrorName('Tên sản phẩm không được quá 255 kí tự!');
                }
                else {
                    setErrorName('');
                }
            }
                break;

            // Add more cases for other fields if needed
            case 'quantity': {
                if (value === '') {
                    setErrorQuantity('Số lượng không được để trống!');
                }
                else if (value < 0) {
                    setErrorQuantity('Số lượng không được nhỏ hơn 0!');
                }
                else if (isNaN(value)) {
                    setErrorQuantity('Số lượng không hợp lệ!');
                }
                else {
                    setErrorQuantity('');
                }
            }
                break;
            case 'price': {
                if (value === '') {
                    setErrorPrice('Giá không được để trống!');
                }
                else if (value < 1) {
                    setErrorPrice('Giá không được nhỏ hơn 1!');
                }
                else if (isNaN(value)) {
                    setErrorPrice('Giá không hợp lệ!');
                }
                else {
                    setErrorPrice('');
                }
            }
                break;
            case 'discount': {
                if (value === '') {
                    setErrorDiscount('Giảm giá không được để trống!');
                }
                else if (value < 0) {
                    setErrorDiscount('Giảm giá không được nhỏ hơn 1!');
                }
                else if (value > 100) {
                    setErrorDiscount('Giảm giá không được lớn hơn 100!');
                }
                else if (isNaN(value)) {
                    setErrorDiscount('Giảm giá không hợp lệ!');
                }
                else {
                    setErrorDiscount('');
                }
            }
                break;

            default:
                return false; // Default to no error
        }
    };

    // if (selectedCategory == '') {
    //     setSelectedErrorCategory('Bắt buộc')
    // }
    // upload ảnh
    const handleUploadThumnail = () => {
        const thumbnailRef = ref(storageFirebase, `product_image/${v4()}`);
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

    // debug
    console.log(tags)

    if (statusLoad === "loading") {
        return <div><Loading /></div>;
    }
    if (statusLoadTags === "succeeded tags") {
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
                                id={name}
                                onBlur={(event) => {
                                    setName(event.target.value);
                                    handleCheckError('name', event.target.value)
                                }}
                                label={'Tên sản phẩm'}
                                error={errorName ? true : false}
                                helperText={errorName}
                            />

                        </DivMargin>
                        <DivMargin>
                            <InputEdit
                                id={quantity}
                                onBlur={(event) => {
                                    setQuantity(event.target.value);
                                    handleCheckError('quantity', event.target.value)
                                }}
                                label={'Số lượng'}
                                error={errorQuantity ? true : false}
                                helperText={errorQuantity}
                            />
                        </DivMargin>
                        <DivMargin>
                            <InputEdit
                                id={price}
                                onBlur={(event) => {
                                    setPrice(event.target.value);
                                    handleCheckError('price', event.target.value)
                                }}
                                label={'Giá tiền'}
                                error={errorPrice ? true : false}
                                helperText={errorPrice}
                            />
                        </DivMargin>
                        <DivMargin>
                            <InputEdit
                                id={discount}
                                onBlur={(event) => {
                                    setDiscount(event.target.value);
                                    handleCheckError('discount', event.target.value)
                                }}
                                label={'Discount'}
                                error={errorDiscount ? true : false}
                                helperText={errorDiscount}
                            />
                        </DivMargin>
                    </InfoBox>
                    <InfoBox title="Phân loại">
                        <DivMargin>
                            <SelectEdit
                                label={'Phân loại'}
                                data={parentCategories}
                                value={''}
                                onChange={(e) => {
                                    setSelectedCategory(e.target.value)
                                }}
                                error={selectedErrorCategory}
                            />
                        </DivMargin>
                        <DivMargin>
                            <SelectEdit
                                label={'Phân loại'}
                                data={childCategories}
                                value={''}
                                onChange={(e) => {
                                    setSelectedCategoryChild(e.target.value)
                                }}
                                error={selectedErrorCategory}
                            />
                        </DivMargin>
                        <DivMargin>
                            <SelectEdit
                                label={'Nhãn hàng'}
                                data={brands}
                                value={''}
                            />
                        </DivMargin>

                    </InfoBox>
                    <InfoBox title="Nhãn sản phẩm">
                        <DivMargin>
                            <AutoFillTag data={tags} />
                        </DivMargin>
                    </InfoBox>
                    <InfoBox title="Hình ảnh">
                        <DivMargin>
                            {thumbnail ? <img src={thumbnailUrl} alt="Thumbnail" /> : <p>No thumbnail available</p>}
                            <input type="file" onChange={(e) => setThumbnail(e.target.files[0])} />
                            <button onClick={(e) => handleUploadThumnail()}>upload</button>
                            <ImageDropZone />
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

}
