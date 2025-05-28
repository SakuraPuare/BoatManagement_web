import {
  loginWithPassword,
  registerWithPassword,
} from "@/services/api/authController";

import { userGetCurrentUser } from "@/services/api/userInfo";
import { useUserStore } from "@/stores/user";
import { getRoleList } from "@/utils/role";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

export const useAuth = () => {
  const router = useRouter();
  const {
    user,
    setUser,
    permissions,
    setPermissions,
    setToken,
    logout: clearUserData,
    token,
  } = useUserStore();

  const updateUser = useCallback(async () => {
    try {
      const response = await userGetCurrentUser();
      if (response.code === 200 && response.data) {
        const userData = response.data as API.UserWithRoleVO;
        setUser(userData);
        const role = typeof userData?.role === "number" ? userData.role : 0;
        setPermissions(getRoleList(role));
        console.log("用户信息更新成功:", userData);
        return userData;
      } else {
        throw new Error(response.message || "获取用户信息失败");
      }
    } catch (error) {
      console.error("Update user error:", error);
      throw error;
    }
  }, [setPermissions, setUser]);

  const login = useCallback(
    async (credentials: API.AuthRequestDTO) => {
      try {
        const response = await loginWithPassword(credentials);

        if (response.code === 200 && response.data?.token) {
          // 设置token
          setToken((response.data as API.TokenVO).token!);
          console.log("登录成功，token已设置");

          // 获取用户信息
          try {
            await updateUser();
            toast.success("登录成功");
            router.push("/");
            return true;
          } catch (userError) {
            console.error("获取用户信息失败:", userError);
            // 清除token
            setToken(null);
            toast.error("登录失败：无法获取用户信息");
            return false;
          }
        } else {
          toast.error(response.message || "登录失败");
          return false;
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error("登录失败，请检查网络连接");
        return false;
      }
    },
    [setToken, updateUser, router]
  );

  const register = useCallback(
    async (credentials: API.AuthRequestDTO) => {
      try {
        if (!credentials.password || credentials.password.length < 6) {
          toast.error("密码长度不能少于6位");
          return false;
        }

        const response = await registerWithPassword(credentials);

        if (response.code === 200 && response.data?.token) {
          // 设置token
          setToken((response.data as API.TokenVO).token!);
          console.log("注册成功，token已设置");

          // 获取用户信息
          try {
            await updateUser();
            toast.success("注册成功");
            router.push("/");
            return true;
          } catch (userError) {
            console.error("获取用户信息失败:", userError);
            // 清除token
            setToken(null);
            toast.error("注册失败：无法获取用户信息");
            return false;
          }
        } else {
          toast.error(response.message || "注册失败");
          return false;
        }
      } catch (error) {
        console.error("Registration error:", error);
        toast.error("注册失败，请检查网络连接");
        return false;
      }
    },
    [router, setToken, updateUser]
  );

  const logout = useCallback(async () => {
    try {
      clearUserData();
      Cookies.remove("user");
      Cookies.remove("permissions");
      toast.success("已成功退出登录");
      router.push("/login");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "退出登录失败");
    }
  }, [clearUserData, router]);

  const checkAuth = useCallback(async () => {
    return !!user;
  }, [user]);

  const checkPermission = useCallback(
    (requiredPermissions: string[]) => {
      if (!permissions.length || !requiredPermissions.length) return false;
      return requiredPermissions.some((permission) =>
        permissions.includes(permission)
      );
    },
    [permissions]
  );

  return {
    user,
    permissions,
    login,
    register,
    logout,
    checkAuth,
    updateUser,
    hasPermission: checkPermission,
    isAuthenticated: !!(token && user),
  };
};
