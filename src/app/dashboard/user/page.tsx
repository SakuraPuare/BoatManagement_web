"use client";

import { Home, Settings, User } from "lucide-react";

const sidebarItems = [
  {
    title: "主页",
    path: "/dashboard/user",
    icon: <Home className="w-5 h-5" />,
  },
  {
    title: "个人信息",
    path: "/dashboard/user/profile",
    icon: <User className="w-5 h-5" />,
  },
  {
    title: "设置",
    path: "/dashboard/user/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

export default function UserDashboard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">欢迎回来</h2>
      <p className="text-gray-600 dark:text-gray-400">
        这里是个人用户控制台主页
      </p>
    </div>
  );
}
