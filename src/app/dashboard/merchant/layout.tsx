"use client";

import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Home, Package, ShoppingCart, Store } from "lucide-react";

const sidebarItems = [
  {
    title: "主页",
    path: "/dashboard/merchant",
    icon: <Home className="w-5 h-5" />,
  },
  {
    title: "商品管理",
    path: "/dashboard/merchant/products",
    icon: <Package className="w-5 h-5" />,
  },
  {
    title: "订单管理",
    path: "/dashboard/merchant/orders",
    icon: <ShoppingCart className="w-5 h-5" />,
  },
  {
    title: "店铺设置",
    path: "/dashboard/merchant/store",
    icon: <Store className="w-5 h-5" />,
  },
];

export default function MerchantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout title="商家平台" sidebarItems={sidebarItems}>
      {children}
    </DashboardLayout>
  );
}
