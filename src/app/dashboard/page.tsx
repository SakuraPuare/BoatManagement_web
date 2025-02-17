"use client";

import { cn } from "@/lib/utils";
import { Building2, ShieldCheck, Store, User } from "lucide-react";
import { useRouter } from "next/navigation"; // 注意这里改用 next/navigation
import { useState } from "react";

interface RoleCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  gradient: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const roles: RoleCard[] = [
    {
      title: "个人用户",
      description: "作为个人用户使用",
      icon: <User className="w-8 h-8" />,
      path: "/dashboard/user",
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      title: "商家平台",
      description: "管理您的店铺、商品和订单",
      icon: <Store className="w-8 h-8" />,
      path: "/dashboard/merchant",
      gradient: "from-purple-500 to-pink-400",
    },
    {
      title: "设备管理",
      description: "管理设备和设备状态",
      icon: <Building2 className="w-8 h-8" />,
      path: "/dashboard/vendor",
      gradient: "from-orange-500 to-yellow-400",
    },
    {
      title: "管理员控制台",
      description: "系统设置和用户管理",
      icon: <ShieldCheck className="w-8 h-8" />,
      path: "/dashboard/admin",
      gradient: "from-green-500 to-emerald-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            选择角色
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            请选择您要访问的角色
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 px-32">
          {roles.map((role) => (
            <div
              key={role.title}
              className={cn(
                "relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 hover:shadow-2xl cursor-pointer border border-gray-100 dark:border-gray-700 w-[280px]",
                hoveredCard === role.title ? "transform -translate-y-2" : ""
              )}
              onMouseEnter={() => setHoveredCard(role.title)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => router.push(role.path)}
            >
              <div
                className={cn(
                  "absolute inset-0 opacity-0 transition-opacity duration-300",
                  hoveredCard === role.title ? "opacity-10" : "",
                  `bg-gradient-to-br ${role.gradient}`
                )}
              />
              <div className="p-8 relative z-10 flex flex-col items-center text-center">
                <div
                  className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center mb-6",
                    `bg-gradient-to-br ${role.gradient}`
                  )}
                >
                  <div className="text-white">{role.icon}</div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                  {role.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {role.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
