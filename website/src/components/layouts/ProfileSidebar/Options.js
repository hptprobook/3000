import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import PlaceIcon from "@mui/icons-material/Place";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const profileSidebarOpt = [
    {
        id: 1,
        icon: <PersonIcon />,
        text: "Thông tin tài khoản",
        url: "/profile",
    },
    {
        id: 2,
        icon: <NotificationsIcon />,
        text: "Thông báo của tôi",
        url: "/profile/notify",
    },
    {
        id: 3,
        icon: <ChromeReaderModeIcon />,
        text: "Quản lý đơn hàng",
        url: "/profile/orders",
    },
    {
        id: 4,
        icon: <PlaceIcon />,
        text: "Sổ địa chỉ",
        url: "/profile/address",
    },
    {
        id: 5,
        icon: <CreditCardIcon />,
        text: "Thông tin thanh toán",
        url: "/profile/payment",
    },
    {
        id: 6,
        icon: <RemoveRedEyeIcon />,
        text: "Sản phẩm đã xem",
        url: "/profile/productSeen",
    },
];
