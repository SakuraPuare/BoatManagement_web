import React, { ReactNode, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";



interface AuthGuardProps {
  children: ReactNode;
  requiredPermissions?: string[];
  fallbackPath?: string;
}

export function AuthGuard({
  children,
  requiredPermissions = [],
  fallbackPath = "/login",
}: AuthGuardProps) {
  const { isAuthenticated, hasPermission, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("请先登录");
      router.push(fallbackPath);
      return;
    }

    if (requiredPermissions.length > 0 && !hasPermission(requiredPermissions)) {
      toast.error("权限不足");
      router.push("/");
      return;
    }
  }, [
    isAuthenticated,
    hasPermission,
    requiredPermissions,
    router,
    fallbackPath,
  ]);

  // 如果未登录或权限不足，不渲染子组件
  if (!isAuthenticated) {
    return null;
  }

  if (requiredPermissions.length > 0 && !hasPermission(requiredPermissions)) {
    return null;
  }

  return <>{children}</>;
}
