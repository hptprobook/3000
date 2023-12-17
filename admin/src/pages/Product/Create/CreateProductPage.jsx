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
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import ImageDropZone from "../../../components/common/DropZoneUpload/DropZoneImage";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAsync } from "../../../redux/slices/categoriesSlice";
import Loading from "../../../components/common/Loading/Loading";
import { fetchAllBrands } from "../../../redux/slices/brandsSlice";
import { fetchAllTags } from "../../../redux/slices/tagsSlice";
import AutoFillTag from "../../../components/common/AutoCompelete/AutoFillTag";
import ButtonNormal from "../../../components/common/Button/ButtonNormal";
import * as Yup from "yup";
import { useFormik } from "formik";
import AutoVariant from "../../../components/common/AutoCompelete/AutoVariant";
import { fetchVariant } from "../../../redux/slices/variantSlice";

const DivMargin = styled.div(({ theme }) => ({
    paddingBottom: '24px',
}));
const productSchema = Yup.object().shape({
    name: Yup.string()
        .required("Tên sản phẩm không được để trống")
        .min(3, "Giá trị không hợp lệ")
        .max(255, "Tên sản phẩm không vượt quá 255 ký tự"),
    quantity: Yup.string()
        .required("Số lượng không được để trống")
        .matches(/^[1-9][0-9]*$/, "Số lương không được âm"),
    price: Yup.number()
        .required("Giá không được trống")
        .min(0, "Giá không thể âm")
        .integer("Giá phải là số nguyên"),
    discount: Yup.number()
        .nullable()
        .max(100, "Giảm giá không thể lớn hơn 100")
        .min(0, "Giảm giá không thể nhỏ hơn 0"),
    // .positive("Giảm giá phải là số dương"),
    brand_id: Yup.number()
        .required("Nhãn hàng không được để trống!"),
    height: Yup.number()
        .required("Chiều cao không được để trống")
        .positive("Chiều cao phải là số dương"),
    weight: Yup.number()
        .required("Cân nặng không được để trống")
        .positive("Cân nặng phải là số dương"),
    width: Yup.number()
        .required("Chiều rộng không được để trống")
        .positive("Chiều rộng phải là số dương"),
    length: Yup.number()
        .required("Chiều dài không được để trống")
        .positive("Chiều dài phải là số dương"),
});
export default function CreateProductPage() {
    // khai báo các hàm liên quan đến fecth data 
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.data);
    const brands = useSelector((state) => state.brands.data);
    const tags = useSelector((state) => state.tags.tags);
    const variant = useSelector((state) => state.variant.data);
    const statusLoadVariant = useSelector((state) => state.variant.status);
    const statusLoad = useSelector((state) => state.categories.status);
    const statusLoadBrands = useSelector((state) => state.brands.status);
    const statusLoadTags = useSelector((state) => state.tags.status);

    const error = useSelector((state) => state.users.error);

    // khai báo các hàm liên quan đế dữ liệu lấy về 
    const [parentCategories, setParentCategories] = useState([]);
    const [childCategories, setChildCategories] = useState([]);

    // khai báo các hàm liên quan đến variant type

    const [variantName, setVariantName] = useState('');
    const [variantNameError, setVariantNameError] = useState('');
    const [variantValue, setVariantValue] = useState('');
    const [variantValueError, setVariantValueError] = useState('');
    const [variantPrice, setVariantPrice] = useState('');
    const [variantPriceError, setVariantPriceError] = useState('');


    // khai báo các hàm liên quan đến dữ liệu
    const [thumbnail, setThumbnail] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [createError, setCreateError] = useState(true);

    const [short_desc, setShort_desc] = useState('');
    const [detail, setDetail] = useState('');


    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedErrorCategory, setSelectedErrorCategory] = useState('');

    const [selectedCategoryChild, setSelectedCategoryChild] = useState('');
    const [selectedErrorCategoryChild, setSelectedErrorCategoryChild] = useState('');
    const formik = useFormik({
        initialValues: {
            name: "",
            price: "",
            discount: null,
            quantity: 1,
            height: 1,
            width: 1,
            length: 1,
            weight: 1,
            brand_id: "",
        },
        // validationSchema: productSchema,
        onSubmit: (values) => {
            console.log(detail);
            // const payload = {
            //     name: values.name,
            //     phone: values.phone,
            //     province_id,
            //     district_id,
            //     street: values.address,
            //     ward_id: ward_code,
            //     address_info: fullAddress,
            //     default: values.isDefault,
            // };

        },
    });

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
        if (statusLoadTags == 'succeeded tags') {
            dispatch(fetchVariant());
        }
    }, [statusLoadTags]);
    useEffect(() => {
        const parent = categories.filter(item => item.parent_id == 0);
        setParentCategories(parent);
    }, [categories]);

    useEffect(() => {
        const child = categories.filter(item => item.parent_id == selectedCategory);
        setChildCategories(child);
    }, [selectedCategory]);

    const handleDetail = (value) => {
        setDetail(value);
    }
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
    const handleChangeVariant = (variant) => {
        console.log(variant)
    }

    const handleAddTag = (value) => {
        // console.log(value);
    }
    // debug

    if (statusLoad === "loading") {
        return <div><Loading /></div>;
    }
    if (statusLoadVariant === "success") {
        return (
            <Box>
                <HeaderPage
                    namePage={"Tạo mới"}
                    Breadcrumb={["Sản phẩm", "Tạo"]}
                />
                <Box sx={{
                    marginTop: '32px'
                }}>
                    <form onSubmit={formik.handleSubmit}>
                        <InfoBox title="Thông tin cơ bản">
                            <DivMargin>
                                <InputEdit
                                    id={'name'}
                                    label={'Tên sản phẩm'}
                                    value={formik.values.name}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    name={'name'}
                                    error={
                                        formik.touched.name &&
                                        Boolean(formik.errors.name)
                                    }
                                    helperText={
                                        formik.touched.name && formik.errors.name
                                    }
                                />
                            </DivMargin>
                            <DivMargin>
                                <InputEdit
                                    id={'quantity'}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    label={'Số lượng'}
                                    name={'quantity'}
                                    error={
                                        formik.touched.quantity &&
                                        Boolean(formik.errors.quantity)
                                    }
                                    helperText={
                                        formik.touched.quantity && formik.errors.quantity
                                    }
                                />
                            </DivMargin>
                            <DivMargin>
                                <InputEdit
                                    id={'price'}
                                    label={'Giá'}
                                    value={formik.values.price}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    name={'price'}
                                    error={
                                        formik.touched.price &&
                                        Boolean(formik.errors.price)
                                    }
                                    helperText={
                                        formik.touched.price && formik.errors.price
                                    }
                                />
                            </DivMargin>
                            <DivMargin>
                                <InputEdit
                                    id={'discount'}
                                    label={'Giảm giá'}
                                    value={formik.values.discount}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    name={'discount'}
                                    error={
                                        formik.touched.discount &&
                                        Boolean(formik.errors.discount)
                                    }
                                    helperText={
                                        formik.touched.discount && formik.errors.discount
                                    }
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
                                    id={'brand'}
                                    value={formik.values.brand_id}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    name={'brand_id'}
                                    error={
                                        formik.touched.brand_id &&
                                        Boolean(formik.errors.brand_id)
                                    }
                                    helperText={
                                        formik.touched.brand_id && formik.errors.brand_id
                                    }
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
                                            label={'Chiều cao'}
                                            value={formik.values.height}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            name={'height'}
                                            error={
                                                formik.touched.height &&
                                                Boolean(formik.errors.height)
                                            }
                                            helperText={
                                                formik.touched.height && formik.errors.height
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <InputEdit
                                            id={'width'}
                                            label={'Chiều rộng'}
                                            value={formik.values.width}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            name={'width'}
                                            error={
                                                formik.touched.width &&
                                                Boolean(formik.errors.width)
                                            }
                                            helperText={
                                                formik.touched.width && formik.errors.width
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <InputEdit
                                            id={'length'}
                                            label={'Chiều dài'}
                                            value={formik.values.length}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            name={'length'}
                                            error={
                                                formik.touched.length &&
                                                Boolean(formik.errors.length)
                                            }
                                            helperText={
                                                formik.touched.length && formik.errors.length
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <InputEdit
                                            id={'weight'}
                                            label={'Cân nặng'}
                                            value={formik.values.weight}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            name={'weight'}
                                            error={
                                                formik.touched.weight &&
                                                Boolean(formik.errors.weight)
                                            }
                                            helperText={
                                                formik.touched.weight && formik.errors.weight
                                            }
                                        />
                                    </Grid>
                                </Grid>
                            </DivMargin>
                        </InfoBox>
                        <InfoBox title="Biến thể">
                            <DivMargin>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <AutoVariant label={'Tên biến thể'} data={variant} handleChange={handleChangeVariant} />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <InputEdit
                                            id={'variant-value'}
                                            label={'Giá trị'}
                                            name={'variant-value'}
                                        // error={
                                        //     formik.touched.width &&
                                        //     Boolean(formik.errors.width)
                                        // }
                                        // helperText={
                                        //     formik.touched.width && formik.errors.width
                                        // }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <InputEdit
                                            id={'variant-price'}
                                            label={'Giá tiền'}
                                            name={'variant-price'}
                                        // error={
                                        //     formik.touched.variant-price &&
                                        //     Boolean(formik.errors.length)
                                        // }
                                        // helperText={
                                        //     formik.touched.length && formik.errors.length
                                        // }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                                            <ButtonNormal label='Thêm' bg='true' />
                                        </div>
                                    </Grid>
                                </Grid>
                            </DivMargin>
                        </InfoBox>
                        <InfoBox title="Hình ảnh">
                            <DivMargin>
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
                                <TinyEditor
                                    handleChange={handleDetail} />
                            </div>
                        </InfoBox>
                        <DivMargin
                            style={{
                                marginTop: '12px',
                                float: 'right'
                            }}
                        >
                            <button type="submit">dasd</button>
                            <ButtonNormal label={'Hủy'} />
                            <ButtonNormal label={'Tạo'} type={'submit'} bg={'true'} />
                        </DivMargin>
                    </form>

                </Box>
            </Box>
        );
    }

}
