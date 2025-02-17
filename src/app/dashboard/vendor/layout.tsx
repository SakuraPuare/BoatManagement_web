"use client";

import {
  Anchor,
  Home,
  Package,
  Settings,
  Ship,
  ShoppingCart,
} from "lucide-react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";

const sidebarItems = [
  {
    title: "主页",
    path: "/dashboard/vendor",
    icon: <Home className="w-5 h-5" />,
  },
  {
    title: "船只列表",
    path: "/dashboard/vendor/boats",
    icon: <Anchor className="w-5 h-5" />,
  },
  {
    title: "供应商品",
    path: "/dashboard/vendor/products",
    icon: <Package className="w-5 h-5" />,
  },
  {
    title: "供应订单",
    path: "/dashboard/vendor/orders",
    icon: <ShoppingCart className="w-5 h-5" />,
  },
  {
    title: "供应商设置",
    path: "/dashboard/vendor/settings",
    icon: <Settings className="w-5 h-5" />,
  },
  {
    title: "船只请求",
    path: "/dashboard/vendor/boat-requests",
    icon: <Ship className="w-5 h-5" />,
  },
];

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout title="供应商平台" sidebarItems={sidebarItems}>
      {children}
    </DashboardLayout>
  );
}
