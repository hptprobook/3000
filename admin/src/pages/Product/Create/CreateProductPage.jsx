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
import ButtonNormal from "../../../components/common/Button/ButtonNormal";

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

    const [form, setForm] = useState({
        name: { value: '', error: '' },
        quantity: { value: '', error: '' },
        price: { value: '', error: '' },
        discount: { value: '', error: '' },
        weight: { value: '', error: '' },
        length: { value: '', error: '' },
        width: { value: '', error: '' },
        height: { value: '', error: '' },
        // Thêm các trường khác vào đây nếu cần
    });

    // Các hàm xử lý lỗi và thay đổi giá trị của trường
    const handleInputChange = (field, data) => {
        setForm({
            ...form,
            [field]: {
                ...form[field],
                value: data,
            },
        });
    };
    useEffect(() => {
        handleCheckError('name', form.name.value);
    }, [form.name.value]);
    // useEffect(() => {
    //     Object.entries(form).forEach(([field, { value }]) => {
    //         handleCheckError(field, value);
    //     });
    // }, Object.values(form));

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
    const validateField = (field, value) => {
        switch (field) {
            case 'name':
                return value === '' ? 'Tên sản phẩm không được để trống!' : value.length > 254 ? 'Tên sản phẩm không được quá 255 kí tự!' : '';

            case 'quantity':
                return value === '' ? 'Số lượng không được để trống!' : value < 0 ? 'Số lượng không được nhỏ hơn 0!' : isNaN(value) ? 'Số lượng không hợp lệ!' : '';

            case 'price':
                return value === '' ? 'Giá không được để trống!' : value < 1 ? 'Giá không được nhỏ hơn 1!' : isNaN(value) ? 'Giá không hợp lệ!' : '';

            case 'discount':
                return value === '' ? 'Giảm giá không được để trống!' : value < 0 ? 'Giảm giá không được nhỏ hơn 1!' : value > 100 ? 'Giảm giá không được lớn hơn 100!' : isNaN(value) ? 'Giảm giá không hợp lệ!' : '';

            case 'width':
                return value === '' ? 'Chiều rộng không được để trống!' : value < 0 ? 'Chiều rộng không được nhỏ hơn 1!' : isNaN(value) ? 'Chiều rộng không hợp lệ!' : '';

            case 'height':
                return value === '' ? 'Chiều cao không được để trống!' : value < 0 ? 'Chiều cao không được nhỏ hơn 1!' : isNaN(value) ? 'Chiều cao không hợp lệ!' : '';

            case 'length':
                return value === '' ? 'Chiều dài không được để trống!' : value < 0 ? 'Chiều dài không được nhỏ hơn 1!' : isNaN(value) ? 'Chiều dài không hợp lệ!' : '';

            case 'weight':
                return value === '' ? 'Cân nặng không được để trống!' : value < 0 ? 'Cân nặng không được nhỏ hơn 1!' : isNaN(value) ? 'Cân nặng không hợp lệ!' : '';

            default:
                return ''; // Default to no error
        }
    };

    const handleCheckError = (field, value) => {
        const error = validateField(field, value);
        setForm({
            ...form,
            [field]: {
                ...form[field],
                error: error,
            },
        });
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
    const handleSubmit = (event) => {
        event.preventDefault(); // Ngăn chặn hành động mặc định của form
        console.log(form); // Xử lý logic khi form được gửi
    };
    const handleCreateProduct = () => {
        // Kiểm tra lỗi cho tất cả các trường
        const isFormEmpty = Object.values(form).some((field) => field.value === '');
        if (isFormEmpty) {
            console.log('Rooxng')
        }
        else {
            console.log('Không rỗng')
        }
        console.log(form)

    };
    const handleAddTag = (value) => {
        console.log(value);
    }
    // debug

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
                        <form action="#" onSubmit={handleSubmit}>
                            <DivMargin>
                                <InputEdit
                                    id={'name'}
                                    onBlur={(event) => handleInputChange('name', event.target.value)}
                                    label={'Tên sản phẩm'}
                                    error={form.name.error ? true : false}
                                    helperText={form.name.error}
                                />
                            </DivMargin>
                            <button type="submit">Heel</button>
                        </form>

                        <DivMargin>
                            <InputEdit
                                id={'quantity'}
                                onBlur={(event) => handleInputChange('quantity', event.target.value)}
                                label={'Số lượng'}
                                error={form.quantity.error ? true : false}
                                helperText={form.quantity.error}
                            />
                        </DivMargin>
                        <DivMargin>
                            <InputEdit
                                id={'price'}
                                onBlur={(event) => handleInputChange('price', event.target.value)}
                                label={'Giá'}
                                error={form.price.error ? true : false}
                                helperText={form.price.error}
                            />
                        </DivMargin>
                        <DivMargin>
                            <InputEdit
                                id={'discount'}
                                onBlur={(event) => handleInputChange('discount', event.target.value)}
                                label={'Giảm giá'}
                                error={form.discount.error ? true : false}
                                helperText={form.discount.error}
                            />
                        </DivMargin>
                    </InfoBox>
                    <InfoBox title="Phân loại">
                        <DivMargin>
                            <SelectEdit
                                label={'Phân loại cha'}
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
                                label={'Phân loại con'}
                                data={childCategories}
                                value={''}
                                disable={selectedCategory ? false : true}
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
                    <InfoBox title="Thuộc tính">
                        <DivMargin>
                            <AutoFillTag data={tags} handleFill={handleAddTag} />
                        </DivMargin>
                        <DivMargin>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <InputEdit
                                        id={'height'}
                                        onBlur={(event) => handleInputChange('height', event.target.value)}
                                        label={'Chiều cao'}
                                        error={form.height.error ? true : false}
                                        helperText={form.height.error}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputEdit
                                        id={'width'}
                                        onBlur={(event) => handleInputChange('width', event.target.value)}
                                        label={'Chiều rộng'}
                                        error={form.width.error ? true : false}
                                        helperText={form.width.error}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputEdit
                                        id={'length'}
                                        onBlur={(event) => handleInputChange('length', event.target.value)}
                                        label={'Chiều dài'}
                                        error={form.length.error ? true : false}
                                        helperText={form.length.error}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputEdit
                                        id={'weight'}
                                        onBlur={(event) => handleInputChange('weight', event.target.value)}
                                        label={'Cân nặng'}
                                        error={form.weight.error ? true : false}
                                        helperText={form.weight.error}
                                    />
                                </Grid>
                            </Grid>
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
                    <DivMargin
                        style={{
                            marginTop: '12px',
                            float: 'right'
                        }}
                    >
                        <ButtonNormal label={'Hủy'} />
                        <ButtonNormal label={'Tạo'} bg={'true'} onClick={handleCreateProduct} />
                    </DivMargin>

                </Box>
            </Box>
        );
    }

}
