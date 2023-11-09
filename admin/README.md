# Run
- npm install
- npm run dev

# Công nghệ chính :
- ReactJS
- Redux toolkit
- Marterial UI

# Folder "components" :
- Chứa 2 folder chính là layout, common
- Chứa các thành phần UI, các components chung sẽ ở trong 1 thư mục
gồm có: Componets.jsx và style.css
- Bắt buộc có đuôi .jsx
- Khuyến khích chia nhỏ thành phần UI càng tốt, không nên để dung 1 components
- Class của component độc quyền theo component: VD: ComponentName => ClassName='ComponentName'
- Css truy cập từ class cha của component đó luôn

# Folder "pages" :
- Chứa các thành phần Page của app, mỗi Page sẽ có 1 folder riêng biệt. Ví dụ:
+ Reading sẽ có page chủ bên ngoài:
     "/user/reading"

# Folder "redux" :
- Sử dụng "redux toolkit"
- Trước tiên tạo 1 slice để sử lý dữ liệu bất đồng bộ (mẫu: question.slice.js), nhớ kèm export default reducers

# Folder "routes" :
# Folder "services" :
- Chứa các thành phần service hổ trợ cho các cụm module.
- Mỗi service có các hàm hổ trợ:
     + findAll
     + findById
     + update
     + delete
     + ...
- Đặt tên hàm nên là "động từ", không nên chứa danh từ kiểu như: "findAllQuestion" , "updateQuestion"

# Folder "styles" :
- Chức các file style

# Folder "utils" :


# Đặt tên file :
- Các file thành phần UI sẽ đặt tên có đuôi là .jsx
- Các file service, slice, utils,... sẽ đặt tên có đuôi là .js
- Thành phần service, ví dụ: 
     "question.service.js", "user.service.js", "order.service.js"
- Thành phần slice, ví dụ: 
     "question.slice.js", "user.slice.js", "order.slice.js"

# Thư viên icon :
- Đã import sẵn thư viện reacticon và material-icons
- boxicons.com
- https://mui.com/material-ui/material-icons/

# Cách dùng components của Mui

- Hàm nhận vào : 
Kiểu 1 :  HeaderPage = (propCustom) -> <HeaderPage link=''/> -> Lúc truy cập bên component propCustom.link
Kiểu 2 :  HeaderPage = ({link}) -> <HeaderPage link=''/> -> Lúc truy cập bên component link

- Custom component Mui: 
     +> Style = Styled mui:
     const StyledTextField = styled(TextField)(({ theme }) => ({
    width: '100%',-> css trực tiếp nó
    '& .MuiFormLabel-root': {
        color: '#edf2f7',

    }, -> css con của nó 
    '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
        color: 'rgb(99, 102, 241)',
    },-> css element có cùng tất cả class 
    '& fieldset': {
        borderColor: 'rgba(243, 244, 246, 0.04)',
        borderRadius: '12px'
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
    }, -> css các hiệu ứng

}));
     +> Dùng sx của của mui:
      '<Button sx={{ 
          color: 'red', 
           '&:hover .MuiOutlinedInput-notchedOutline': {
           borderColor: 'transparent',
           }, -> css các hiệu ứng
           }} variant="contained">Contained</Button>'
     +> Dùng class name :
     


# Hướng dẫn code 1 chức năng:
- Bước 1: đọc tài liệu api từ https://api.ptepathway.com/api
- Bước 2: tạo file service liên quan chứa các hàm gọi api. Lưu ý dùng AxiosService để gọi api
- Bước 3: tạo file slice trong redux, viết các hàm xử lý bất đồng bộ từ createAsyncThunk
- Bước 4: import reducers từ slice vừa tạo vào trong store.js
- Bước 5: Tạo thư mục Page, phân tích chia nhỏ thành phần UI vào trong folder "components"
- Bước 6: Tạo router examRouter hoặc userRouter
- ...

- Cách sử dụng .env :
+ Ví dụ trong file .env có : REACT_API_URL=https://api.ptepathway.com/
+ Khi lấy dữ liệu sẽ là :    const baseURL = import.meta.env.REACT_API_URL;
+ import.meta.env.[KEY]
