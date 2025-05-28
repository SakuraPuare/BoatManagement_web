"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Building2, Home, ShieldCheck, Store, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { getUserRoleNames, hasRole } from "@/utils/role";
import { toast } from "sonner";

interface RoleCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  gradient: string;
  requiredRoles: string[];
  roleCode: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, updateUser } = useAuth();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        if (!isAuthenticated) {
          console.log("用户未认证，跳转到登录页");
          router.push("/login");
          return;
        }

        if (!user) {
          console.log("用户信息为空，尝试获取用户信息");
          await updateUser();
        }
      } catch (error) {
        console.error("获取用户信息失败:", error);
        toast.error("获取用户信息失败");
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    // 延迟执行，给zustand时间从localStorage恢复状态
    const timer = setTimeout(initializeUser, 100);
    return () => clearTimeout(timer);
  }, [isAuthenticated, user, updateUser, router]);

  const handleCardClick = (role: RoleCard) => {
    const userRole = user?.role || 0;
    console.log(
      `检查权限: 用户角色=${userRole}, 需要角色=${role.requiredRoles}`
    );

    if (hasRole(userRole, role.requiredRoles)) {
      console.log(`权限检查通过，跳转到: ${role.path}`);
      router.push(role.path);
    } else {
      console.log(`权限检查失败`);
      toast.error(`您没有访问${role.title}的权限`);
    }
  };

  const roles: RoleCard[] = [
    {
      title: "个人用户",
      description: "作为个人用户使用",
      icon: <User className="w-8 h-8" />,
      path: "/dashboard/user",
      gradient: "from-blue-500 to-cyan-400",
      requiredRoles: ["USER", "VENDOR", "MERCHANT", "BOAT_OWNER"],
      roleCode: "USER",
    },
    {
      title: "商家平台",
      description: "管理您的店铺、商品和订单",
      icon: <Store className="w-8 h-8" />,
      path: "/dashboard/merchant",
      gradient: "from-purple-500 to-pink-400",
      requiredRoles: ["MERCHANT"],
      roleCode: "MERCHANT",
    },
    {
      title: "设备管理",
      description: "管理设备和设备状态",
      icon: <Building2 className="w-8 h-8" />,
      path: "/dashboard/vendor",
      gradient: "from-orange-500 to-yellow-400",
      requiredRoles: ["VENDOR"],
      roleCode: "VENDOR",
    },
    {
      title: "管理员控制台",
      description: "系统设置和用户管理",
      icon: <ShieldCheck className="w-8 h-8" />,
      path: "/dashboard/admin",
      gradient: "from-green-500 to-emerald-400",
      requiredRoles: ["ADMIN"],
      roleCode: "ADMIN",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">正在跳转到登录页...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="absolute top-8 left-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/")}
            className="hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Home className="h-8 w-8 text-gray-600 dark:text-gray-400" />
          </Button>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            选择角色
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            欢迎，{user.username}！请选择您要访问的角色
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            当前角色: {getUserRoleNames(user.role || 0).join(", ") || "无"}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 px-32">
          {roles.map((role) => {
            const hasAccess = hasRole(user?.role || 0, role.requiredRoles);

            return (
              <div
                key={role.title}
                className={cn(
                  "relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 w-[280px]",
                  hasAccess
                    ? "hover:shadow-2xl cursor-pointer"
                    : "opacity-50 cursor-not-allowed",
                  hoveredCard === role.title && hasAccess
                    ? "transform -translate-y-2"
                    : ""
                )}
                onMouseEnter={() => hasAccess && setHoveredCard(role.title)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleCardClick(role)}
              >
                <div
                  className={cn(
                    "absolute inset-0 opacity-0 transition-opacity duration-300",
                    hoveredCard === role.title && hasAccess ? "opacity-10" : "",
                    `bg-gradient-to-br ${role.gradient}`
                  )}
                />
                <div className="p-8 relative z-10 flex flex-col items-center text-center">
                  <div
                    className={cn(
                      "w-20 h-20 rounded-full flex items-center justify-center mb-6",
                      `bg-gradient-to-br ${role.gradient}`,
                      !hasAccess && "grayscale"
                    )}
                  >
                    <div className="text-white">{role.icon}</div>
                  </div>
                  <h3
                    className={cn(
                      "text-2xl font-semibold mb-3",
                      hasAccess
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-400 dark:text-gray-600"
                    )}
                  >
                    {role.title}
                  </h3>
                  <p
                    className={cn(
                      hasAccess
                        ? "text-gray-600 dark:text-gray-400"
                        : "text-gray-400 dark:text-gray-600"
                    )}
                  >
                    {role.description}
                  </p>
                  {!hasAccess && (
                    <div className="mt-3 px-3 py-1 bg-red-100 dark:bg-red-900 rounded-full">
                      <span className="text-xs text-red-600 dark:text-red-400">
                        无权限
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
