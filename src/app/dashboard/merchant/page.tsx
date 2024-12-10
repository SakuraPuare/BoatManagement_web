"use client"

import { Home, Package, ShoppingCart, Store } from "lucide-react"
import { DashboardLayout } from "@/components/layouts/DashboardLayout"

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
]

export default function MerchantDashboard() {
  return (
    <DashboardLayout title="商家平台" sidebarItems={sidebarItems}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">商家控制台</h2>
        <p className="text-gray-600 dark:text-gray-400">
          这里是商家平台控制台主页
        </p>
      </div>
    </DashboardLayout>
  )
} 