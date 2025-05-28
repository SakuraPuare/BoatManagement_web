import React from "react";

import { Building2, Home, Monitor, Settings } from "lucide-react";

("use client");

const sidebarItems = [
  {
    title: "主页",
    path: "/dashboard/vendor",
    icon: <Home className="w-5 h-5" />,
  },
  {
    title: "设备列表",
    path: "/dashboard/vendor/devices",
    icon: <Monitor className="w-5 h-5" />,
  },
  {
    title: "设备状态",
    path: "/dashboard/vendor/status",
    icon: <Building2 className="w-5 h-5" />,
  },
  {
    title: "系统设置",
    path: "/dashboard/vendor/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

export default function VendorDashboard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">设备管理控制台</h2>
      <p className="text-gray-600 dark:text-gray-400">
        这里是设备管理控制台主页
      </p>
    </div>
  );
}
