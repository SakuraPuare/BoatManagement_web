import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Anchor, Bell, Home, ShoppingBag, Store, Ticket, User } from "lucide-react";
import React from "react";

const sidebarItems = [
  {
    title: "概览",
    path: "/dashboard/user",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "船只请求",
    path: "/dashboard/user/boat-requests",
    icon: <Anchor className="h-4 w-4" />,
  },
  {
    title: "我的订单",
    path: "/dashboard/user/orders",
    icon: <ShoppingBag className="h-4 w-4" />,
  },
  {
    title: "商家列表",
    path: "/dashboard/user/merchants",
    icon: <Store className="h-4 w-4" />,
  },
  // {
  //   title: "个人中心",
  //   path: "/dashboard/user/profile",
  //   icon: <User className="h-4 w-4" />,
  // },
  // {
  //   title: "消息通知",
  //   path: "/dashboard/user/notifications",
  //   icon: <Bell className="h-4 w-4" />,
  // },
];

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout sidebarItems={sidebarItems} title="用户中心">
      {children}
    </DashboardLayout>
  );
}
