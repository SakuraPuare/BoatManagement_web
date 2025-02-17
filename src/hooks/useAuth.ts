import {useCallback} from "react";
import {useRouter} from "next/navigation";
import {useUserStore} from "@/stores/user";
import {toast} from "sonner";
import {loginWithPassword, registerWithPassword} from "@/services/api/authController";
import {getMe} from "@/services/api/userInfo";
import type { API } from "@/services/api/typings";
import Cookies from "js-cookie";
import {getRoleEnglishNames} from "@/lib/constants/role";

export const useAuth = () => {
    const router = useRouter();
    const {user, setUser, permissions, setPermissions, setToken} = useUserStore();
    
    const updateUser = useCallback(async () => {
        try {
            const response = await getMe();
            console.log(response.data);
            if (response.data && response.data.code === 200) {
                setUser(response.data.data as API.UserInfoVO);
                // 确保response.data.role存在且为number类型
                const role = typeof response.data.data?.role === 'number' ? response.data.data?.role : 0;
                setPermissions(getRoleEnglishNames(role));
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
                console.log(response.data);
                if (response.data && response.data.code === 200) {
                    // 确保token存在
                    if (!response.data.data?.token) {
                        toast.error("登录失败：无效的token");
                        return false;
                    }
                    
                    setToken(response.data.data?.token);
                    await updateUser();
                    
                    if (!user) {
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
        [setToken, updateUser, router, user, permissions],
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
