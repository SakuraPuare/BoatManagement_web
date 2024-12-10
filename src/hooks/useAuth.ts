import { useCallback } from "react";
import { useRouter } from 'next/navigation'
import { useUserStore } from "@/stores/user";
import { api } from "@/lib/api";
import { toast } from "sonner";
import type { UserSelf } from "@/types/user";
import Cookies from "js-cookie";

interface Credentials {
  username: string;
  password: string;
}

export const useAuth = () => {
  const router = useRouter()
  const { user, setUser, permissions, setPermissions, setToken } =
    useUserStore();

  const updateUser = useCallback(async () => {
    const user = await api.get<UserSelf>("/user/me");
    setUser(user);

    const permissions = [];
    if (user.role & 1) permissions.push("user");
    if (user.role & (1 << 1)) permissions.push("merchant");
    if (user.role & (1 << 2)) permissions.push("vendor");
    if (user.role & (1 << 3)) permissions.push("admin");
    setPermissions(permissions);
  }, [setPermissions, setUser]);

  const login = useCallback(
    async (credentials: Credentials) => {
      try {
        const response = await api.post<{ token: string }>("/auth/login", {
          body: credentials,
        });

        console.log(response);
        setToken(response.token);

        await updateUser();

        toast.success("登录成功");
        router.push('/dashboard')

        // 将 user 和 permissions 存储到 cookie
        Cookies.set("user", JSON.stringify(user));
        Cookies.set("permissions", JSON.stringify(permissions));

        return true;
      } catch (error) {
        console.error("Login error:", error);
        toast.error("登录失败");
        return false;
      }
    },
    [setToken, updateUser, router, user, permissions],
  );

  const register = useCallback(
    async (credentials: Credentials) => {
      try {
        if (credentials.password.length < 6) {
          toast.error("密码长度不能少于6位");
          return false;
        }

        const response = await api.post<{ token: string }>("/auth/register", {
          body: credentials,
        });

        setToken(response.token);

        await updateUser();

        toast.success("注册成功");
        // router.push('/dashboard')
        return true;
      } catch (error) {
        console.error("Registration error:", error);
        toast.error("注册失败");
        return false;
      }
    },
    [setToken, updateUser],
  );

  const logout = useCallback(() => {
    setUser(null);
    setPermissions([]);
    setToken(null);

    Cookies.remove("user");
    Cookies.remove("permissions");
    // router.push('/login')
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
