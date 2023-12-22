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
import ListVariantSelect from "../../../components/common/List/ListVariantSelect";
import BasicAlertl from "../../../components/common/Alert/BasicAlertl";
import LinearIndeterminate from "../../../components/common/Loading/LoadingLine";
import { createProduct, fetchProductById, resetState, updateProduct } from "../../../redux/slices/productSlice";
import { useParams } from "react-router-dom";
import { TbCurrencyDong } from "react-icons/tb";
import { ReadOnly } from "../../../components/common/TextField/ReadOnly";

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
        .min(1000, "Giá không thể dưới 1000đ")
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
export default function EditProductPage() {
    // khai báo các hàm liên quan đến fecth data 
    const { id } = useParams();
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.data);
    const brands = useSelector((state) => state.brands.data);
    const tags = useSelector((state) => state.tags.tags);
    const variant = useSelector((state) => state.variant.data);
    const statusLoad = useSelector((state) => state.categories.status);
    const product = useSelector((state) => state.products.product);
    const statusFetch = useSelector((state) => state.products.statusFetchById);
    const statusUpdate = useSelector((state) => state.products.statusUpdate);
    const dataUpdateReturn = useSelector((state) => state.products.dataUpdateReturn);

    // khai báo các hàm liên quan đế dữ liệu lấy về 
    const [parentCategories, setParentCategories] = useState([]);
    const [childCategories, setChildCategories] = useState([]);

    // khai báo các hàm liên quan đến variant type

    const [listVariant, setListVariant] = useState([]);

    const [variantName, setVariantName] = useState('');
    const [variantNameError, setVariantNameError] = useState('');
    const [variantValue, setVariantValue] = useState('');
    const [variantValueError, setVariantValueError] = useState('');
    const [variantPrice, setVariantPrice] = useState('');
    const [variantPriceError, setVariantPriceError] = useState('');
    const [taglist, setTaglist] = useState('');

    // khai báo các hàm liên quan đến dữ liệu
    const [imglist, setImglist] = useState([]);
    const [createError, setCreateError] = useState(false);
    const [createErrorHelp, setCreateErrorHelp] = useState('');

    const [short_desc, setShort_desc] = useState('');
    const [short_descError, setShort_descError] = useState('');
    const [detail, setDetail] = useState('');
    const [successFetch, setSuccessFetch] = useState(false);
    const [successUpdate, setSuccessUpdate] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState('');
    const [category_id, setCategory_id] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchProductById({ id }));
            await dispatch(fetchCategoriesAsync());
            await dispatch(fetchAllBrands());
            await dispatch(fetchAllTags());
            await dispatch(fetchVariant());
        };

        fetchData();

    }, [id, dispatch]);

    useEffect(() => {
        if (statusFetch === 'success') {
            setSuccessFetch(true);
            const dfVariant = transformVariant(product.variants);
            setListVariant(dfVariant);
            formik.setValues({
                name: product.name,
                price: product.price,
                discount: product.discount,
                quantity: product.quantity,
                height: product.height,
                width: product.width,
                length: product.length,
                weight: product.weight,
                brand_id: product.brand_id,
            });
            dispatch(resetState());
            setDetail(product.detail);
            setShort_desc(product.short_desc);
            setCategory_id(product.category_id);
        }
    }, [statusFetch, dispatch]);
    useEffect(() => {
        if (statusUpdate == 'success') {
            setSuccessUpdate(true);
            dispatch(resetState());
        }
    }, [statusUpdate])
    // upload anh

    const formik = useFormik({
        validationSchema: productSchema,
        onSubmit: (values) => {
            setCreateError(false);
            if (createError && createErrorHelp !== '') {
                setCreateError(true);
                setCreateError(createErrorHelp);
            }
            else {
                if (category_id == '') {
                    setCreateError(true);
                    setCreateErrorHelp('Vui lòng chọn phân loại sản phẩm');
                } else {
                    setCreateError(false);
                    if (short_desc == '') {
                        setCreateErrorHelp('Mô tả ngắn không được rỗng!');
                        setCreateError(true);
                    }
                    else {
                        setCreateError(false);
                        if (detail == '') {
                            setCreateErrorHelp('Mô tả chi tiết không được rỗng!');
                            setCreateError(true);
                        }
                        else {
                            setCreateError(false);
                            setSuccessUpdate(false);
                            let variants = listVariant.map(item => {
                                const { id, ...rest } = item;
                                return rest;
                            });
                            if (taglist !== '') {
                                values['tags'] = taglist;
                            }
                            values['detail'] = detail;
                            values['short_desc'] = short_desc;
                            values['category_id'] = category_id;
                            values['variants'] = variants;
                            dispatch(updateProduct({ id: id, data: values }));
                        }
                    }
                }
            }
        },
    });
    useEffect(() => {
        const parent = categories.filter(item => item.parent_id == 0);
        setParentCategories(parent);
    }, [categories]);
    useEffect(() => {
        const child = categories.filter(item => item.parent_id == selectedCategory);
        setChildCategories(child);
    }, [selectedCategory]);

    const handleValidateDetail = (value) => {
        if (value.length < 12) {
            console.log(value);
            setCreateError(true)
            setCreateErrorHelp('Mô tả chi tiết không ít hơn 12 kí tự');
        }
        else if (value.length > 18000) {
            setCreateError(true)
            setCreateErrorHelp('Mô tả chi tiết không nhiều hơn 18000 kí tự');
        }
        else {
            setCreateError(false)
            setCreateErrorHelp('');
        }
    };
    const handleDetail = (value) => {
        setDetail(value);
    }
    useEffect(() => {
        handleValidateDetail(detail);
    }, [detail]);
    const handleValidateShortDesc = (value) => {
        if (value.length > 1024) {
            setCreateError(true)
            setCreateErrorHelp('Mô tả ngắn không quá 512 kí tự');
        }
        else if (value.length < 10) {
            setCreateError(true)
            setCreateErrorHelp('Mô tả ngắn không ít hơn 10 kí tự');
        }
        else {
            setCreateError(false)
            setCreateErrorHelp('');
        }

    }
    useEffect(() => {
        handleValidateShortDesc(short_desc);
    }, [short_desc]);
    const handleShortDesc = (value) => {
        setShort_desc(value);
    };
    const transformVariant = (originalData) => {
        const result = [];
        let idCounter = 1;

        // Duyệt qua mỗi phần tử trong mảng gốc
        originalData.forEach(category => {
            const variantType = category.variantType;

            // Duyệt qua từng option trong mỗi category
            category.options.forEach(option => {
                const name = option.name;
                const price = option.price;

                // Tạo đối tượng mới và đẩy vào mảng kết quả
                result.push({
                    id: idCounter++,
                    value: variantType,
                    name: name,
                    price: price
                });
            });
        });

        return result;
    }
    // upload ảnh
    const handleChangeVariantName = (variant) => {
        handleValidateVariant('name', variant);
    }
    const handleDeleteItemVariant = (id) => {
        const updatedList = listVariant.filter(variant => variant.id !== id);
        setListVariant(updatedList);
    };

    const handleCreateVariant = () => {
        if (handleValidateVariant('name', variantName)) {
            if (handleValidateVariant('price', variantPrice)) {
                if (handleValidateVariant('value', variantValue)) {
                    const id = listVariant.length > 0 ? listVariant[listVariant.length - 1].id + 1 : 1;
                    const variant = {
                        id: id,
                        name: variantName,
                        price: variantPrice,
                        value: variantValue
                    }
                    setListVariant([...listVariant, variant])
                    setVariantPrice('');
                    setVariantValue('');
                }
            }
        }
    }
    const handleAddTag = (value) => {
        const nameTags = value.map((item) => item.name);
        const nameTag = nameTags.join(' | ');
        setTaglist(nameTag);
    }

    const handleValidateVariant = (name, value) => {
        switch (name) {
            case 'name': {
                if (value === '') {
                    setVariantNameError('Tên biến thể không được để trống');
                    setVariantName('');
                    return false;
                }
                else if (value.length > 100) {
                    setVariantNameError('Tên biến thể không được quá 100 kí tự');
                    setVariantName('');
                    return false;
                }
                else {
                    setVariantNameError('');
                    setVariantName(value);
                    return true;
                }
            }
                break;
            case 'value': {
                if (value === '') {
                    setVariantValueError('Giá trị biến thể không được để trống');
                    setVariantValue('');
                    return false;
                }
                else if (value.length > 128) {
                    setVariantValue('');
                    setVariantValueError('Giá trị biến thể không được quá 128 kí tự');
                    return false;
                }
                else {
                    setVariantValueError('');
                    setVariantValue(value);
                    return true;
                }
            }
                break;
            case 'price': {
                if (value === '') {
                    setVariantPriceError('Giá tiền biến thể không được để trống');
                    setVariantPrice('');
                    return false;
                }
                else if (isNaN(value)) {
                    setVariantPriceError('Giá tiền không đúng định dạng');
                    setVariantPrice('');

                    return false;
                }
                else if (value < 0) {
                    setVariantPriceError('Giá tiền không được nhỏ hơn 0');
                    setVariantPrice('');
                    return false;
                }
                else {
                    setVariantPriceError('');
                    setVariantPrice(value);
                    return true;
                }
            }
                break;

        }
    }
    // debug
    if (!successFetch) {
        return <div><Loading /></div>;
    }
    if (successFetch) {
        return (
            <Box>
                {successUpdate ? <BasicAlertl label={'Chỉnh sửa sản phẩm thành công'} severity={'success'} /> : null}
                {statusUpdate == 'loading' ? <LinearIndeterminate /> : null}
                {createError ? <BasicAlertl label={createErrorHelp} severity={'error'} /> : null}

                <HeaderPage
                    namePage={"Chỉnh sửa"}
                    Breadcrumb={["Sản phẩm", "Chỉnh sửa"]}
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
                                    value={formik.values.quantity}
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
                                    icon={<TbCurrencyDong />}
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
                                <ReadOnly label={'Phân loại cũ'} value={product.category.name} />
                            </DivMargin>
                            <DivMargin>
                                <SelectEdit
                                    label={'Phân loại cha'}
                                    data={parentCategories}
                                    value={''}
                                    onChange={(e) => {
                                        setSelectedCategory(e.target.value),
                                            setCategory_id(e.target.value)
                                    }}
                                />
                            </DivMargin>
                            <DivMargin>
                                <SelectEdit
                                    label={'Phân loại con'}
                                    data={childCategories}
                                    value={''}
                                    disable={selectedCategory ? false : true}
                                    onChange={(e) => {
                                        setCategory_id(e.target.value)
                                    }}
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
                                    <Grid item xs={12} md={4}>
                                        <AutoVariant
                                            label={'Tên biến thể'}
                                            data={variant}
                                            handleChange={handleChangeVariantName}
                                            error={variantNameError == '' ? false : true}
                                            helperText={variantNameError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <InputEdit
                                            id={'variant-value'}
                                            label={'Giá trị'}
                                            name={'variant-value'}
                                            value={variantValue}
                                            onChange={(e) => { handleValidateVariant('value', e.target.value) }}
                                            onBlur={(e) => { handleValidateVariant('value', e.target.value) }}
                                            error={variantValueError == '' ? false : true}
                                            helperText={variantValueError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <InputEdit
                                            id={'variant-price'}
                                            label={'Giá tiền'}
                                            name={'variant-price'}
                                            value={variantPrice}
                                            onChange={(e) => { handleValidateVariant('price', e.target.value) }}
                                            onBlur={(e) => { handleValidateVariant('price', e.target.value) }}
                                            error={variantPriceError == '' ? false : true}
                                            helperText={variantPriceError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <ButtonNormal label='Thêm' bg='true' onClick={handleCreateVariant} />

                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        {listVariant.length > 0 ? <ListVariantSelect data={listVariant} onClick={handleDeleteItemVariant} /> : ''}
                                    </Grid>
                                </Grid>
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
                                <TinyEditorMini defaultValue={product.short_desc} onEditorChange={handleShortDesc} />
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
                                    defaultValue={product.detail}
                                    handleChange={handleDetail} />
                            </div>
                        </InfoBox>
                        <DivMargin
                            style={{
                                marginTop: '12px',
                                float: 'right'
                            }}
                        >
                            <ButtonNormal label={'Hủy'} />
                            <ButtonNormal label={'Lưu'} type={'submit'} bg={'true'} />
                        </DivMargin>
                    </form>

                </Box>
            </Box>
        );
    }
}
