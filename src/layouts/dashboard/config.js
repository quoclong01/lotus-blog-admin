import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import ChatBubbleLeftRightIcon from '@heroicons/react/24/solid/ChatBubbleLeftRightIcon';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: "Tổng quan",
    path: "/",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Quản lý người dùng",
    path: "/users",
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Quản lý bài viết",
    path: "/posts",
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Quản lý bình luận",
    path: "/comments",
    icon: (
      <SvgIcon fontSize="small">
        <ChatBubbleLeftRightIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Tài khoản của tôi",
    path: "/account",
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Cài đặt",
    path: "/settings",
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    ),
  },
];
