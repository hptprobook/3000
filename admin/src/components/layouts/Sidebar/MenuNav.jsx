import React from 'react';
import { BiHomeSmile, BiSolidCoupon } from 'react-icons/bi';
import { TbDeviceAnalytics } from 'react-icons/tb';
import { MdLabel, MdOutlineAccountCircle, MdOutlineLabelImportant, MdOutlinePostAdd, MdOutlineSell, MdPayments, MdSettings, MdWebAsset } from 'react-icons/md';
import { LuUsers2 } from 'react-icons/lu';
import { HiMiniChatBubbleOvalLeftEllipsis, HiShoppingBag } from 'react-icons/hi2';
import { HiMailOpen, HiOutlineLogout } from 'react-icons/hi';
import { FaShoppingCart } from 'react-icons/fa';

export function createList(label, key, link, icon, children) {
  return {
    key,
    icon,
    children,
    label,
    link,
  };
}

export function getMenuNav() {
  return [
    createList('', 'menu1', null, '', [
      createList('Tổng quan', 'overview', '/', <BiHomeSmile />),
      createList('Phân tích', 'analytics', '/analytics', <TbDeviceAnalytics />),
      createList('Mail', 'mail', '/mail', <HiMailOpen />),
      createList('Chat', 'chat', '/chat', <HiMiniChatBubbleOvalLeftEllipsis />),
      createList('Bài viết', 'posts', '/posts', <MdOutlinePostAdd />,[
        createList('Danh sách', 'posts-list', '/posts/list'),
        createList('Tạo', 'posts-create', '/posts/create'),
      ]),
    ]),
    createList('Bán hàng', 'menu2', true, <MdOutlineSell />, [
      createList('Người dùng', 'user', '/user', <LuUsers2 />, [
        createList('Danh sách', 'user-list', '/user/list'),
        createList('Tạo', 'user-create', '/user/create'),
        createList('Danh sách cấm', 'user-list-ban', '/user/list-ban'),
      ]),
      createList('Sản phẩm', 'products', '/products', <HiShoppingBag />, [
        createList('Danh sách', 'products-list', '/products/list'),
        createList('Tạo', 'products-create', '/products/create'),
        createList('Kho', 'products-warehouse', '/products/warehouse'),
      ]),
      createList('Phân loại', 'categroy', '/categroy', <MdOutlineLabelImportant />, [
        createList('Danh sách', 'categroy-list', '/categroy/list'),
        createList('Tạo', 'categroy-create', '/categroy/create'),
        createList('Nhãn hàng', 'category-brand', '/category/brand'),
        createList('Nhãn sản phẩm', 'category-tag', '/category/tag'),
      ]),
      createList('Mã giảm giá', 'coupon', '/coupon', <BiSolidCoupon />, [
        createList('Danh sách', 'coupon-list', '/coupon/list'),
        createList('Tạo', 'coupon-create', '/coupon/create'),
      ]),
      createList('Đơn hàng', 'order', '/order', <FaShoppingCart />),
    ]),
    createList('Trang web', 'menu3', true, <MdWebAsset />, [
      createList('Payment', 'payment', '/payment', <MdPayments />),
      createList('Cài đặt', 'setting', '/setting', <MdSettings />, [
        createList('Tài khoản', 'setting-account', '/setting/account'),
        createList('Trang Web', 'setting-website', '/setting/website'),
      ]),
      createList('Đăng xuất', 'logout', '/logout', <HiOutlineLogout />),

    ]),
  ];
}
