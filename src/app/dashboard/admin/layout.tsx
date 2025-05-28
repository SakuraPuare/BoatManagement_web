"use client";
import React from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import {
  Anchor,
  BarChart,
  Bell,
  Building2,
  CalendarRange,
  Package,
  Settings,
  Shield,
  Ship,
  Store,
  TrendingUp,
  Truck,
  UserCheck,
  UserCog,
  Users,
} from "lucide-react";

const sidebarItems = [
  {
    title: "仪表板",
    path: "/dashboard/admin",
    icon: <BarChart className="h-4 w-4" />,
  },
  {
    title: "系统统计",
    path: "/dashboard/admin/statistics",
    icon: <TrendingUp className="h-4 w-4" />,
  },
  {
    title: "用户管理",
    path: "/dashboard/admin/users",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "角色管理",
    path: "/dashboard/admin/roles",
    icon: <UserCog className="h-4 w-4" />,
  },
  {
    title: "权限管理",
    path: "/dashboard/admin/permissions",
    icon: <Shield className="h-4 w-4" />,
  },
  {
    title: "通知管理",
    path: "/dashboard/admin/notifications",
    icon: <Bell className="h-4 w-4" />,
  },
  {
    title: "单位管理",
    path: "/dashboard/admin/units",
    icon: <Building2 className="h-4 w-4" />,
  },
  {
    title: "商户管理",
    path: "/dashboard/admin/merchants",
    icon: <Store className="h-4 w-4" />,
  },
  {
    title: "供应商管理",
    path: "/dashboard/admin/vendors",
    icon: <Truck className="h-4 w-4" />,
  },
  {
    title: "用户审核",
    path: "/dashboard/admin/user-audit",
    icon: <UserCheck className="h-4 w-4" />,
  },
  {
    title: "码头管理",
    path: "/dashboard/admin/docks",
    icon: <Anchor className="h-4 w-4" />,
  },
  {
    title: "船只管理",
    path: "/dashboard/admin/boats",
    icon: <Ship className="h-4 w-4" />,
  },
  {
    title: "船型管理",
    path: "/dashboard/admin/boat-types",
    icon: <Settings className="h-4 w-4" />,
  },
  {
    title: "商品管理",
    path: "/dashboard/admin/goods",
    icon: <Package className="h-4 w-4" />,
  },
  {
    title: "船舶预订",
    path: "/dashboard/admin/boat-requests",
    icon: <CalendarRange className="h-4 w-4" />,
  },
  {
    title: "订单管理",
    path: "/dashboard/admin/orders",
    icon: <Ship className="h-4 w-4" />,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout sidebarItems={sidebarItems} title="管理员控制台">
      {children}
    </DashboardLayout>
  );
}
