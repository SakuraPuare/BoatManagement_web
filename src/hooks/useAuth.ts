import { getRoleEnglishNames } from "@/lib/constants/role";
import {
  loginWithPassword,
  registerWithPassword,
} from "@/services/api/authController";
import type { API } from "@/services/api/typings";
import { getMe } from "@/services/api/userInfo";
import { useUserStore } from "@/stores/user";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

export const useAuth = () => {
  const router = useRouter();
  const { user, setUser, permissions, setPermissions, setToken } =
    useUserStore();

  const updateUser = useCallback(async () => {
    try {
      const response = await getMe();
      if (response.data && response.data.code === 200) {
        const userData = response.data.data as API.BaseAccountsVO;
        setUser(userData);
        const role = typeof userData?.role === "number" ? userData.role : 0;
        setPermissions(getRoleEnglishNames(role));
        return userData; // 返回用户数据
      } else {
        throw new Error(response.data.message || "Failed to get user info");
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
        if (response.data && response.data.code === 200) {
          if (!response.data.data?.token) {
            toast.error("登录失败：无效的token");
            return false;
          }

          setToken(response.data.data?.token);

          // 等待获取用户信息完成，并获取返回的用户数据
          const userData = await updateUser();

          if (!userData) {
            toast.error("登录失败：无法获取用户信息");
            return false;
          }

          toast.success("登录成功");
          router.push("/");
          return true;
        }

        toast.error(response.data.message || "登录失败");
        return false;
      } catch (error) {
        console.error("Login error:", error);
        toast.error("登录失败");
        return false;
      }
    },
    [setToken, updateUser, router], // 移除 user 和 permissions 依赖
  );

  const register = useCallback(
    async (credentials: API.AuthRequestDTO) => {
      try {
        if (!credentials.password || credentials.password.length < 6) {
          toast.error("密码长度不能少于6位");
          return false;
        }

        const response = await registerWithPassword(credentials);

        if (response.data && response.data.code === 200) {
          if (!response.data.data?.token) {
            toast.error("注册失败：无效的token");
            return false;
          }

          setToken(response.data.data?.token);
          await updateUser();

          toast.success("注册成功");
          router.push("/");
          return true;
        }

        toast.error(response.data.message || "注册失败");
        return false;
      } catch (error) {
        console.error("Registration error:", error);
        toast.error("注册失败");
        return false;
      }
    },
    [router, setToken, updateUser],
  );

  const logout = useCallback(async () => {
    try {
      setUser(null);
      setPermissions([]);
      setToken(null);

      Cookies.remove("user");
      Cookies.remove("permissions");

      toast.success("已成功退出登录");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "退出登录失败");
    }
  }, [setUser, setPermissions, setToken]);

  const checkAuth = useCallback(async () => {
    return !!user;
  }, [user]);

  const hasPermission = useCallback(
    (requiredPermissions: string[]) => {
      if (!permissions.length || !requiredPermissions.length) return false;
      return requiredPermissions.some((permission) =>
        permissions.includes(permission),
      );
    },
    [permissions],
  );

  return {
    user,
    permissions,
    login,
    register,
    logout,
    checkAuth,
    updateUser,
    hasPermission,
    isAuthenticated: !!user,
  };
};
