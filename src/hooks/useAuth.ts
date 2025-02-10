import {useCallback} from "react";
import {useRouter} from "next/navigation";
import {useUserStore} from "@/stores/user";
import {api} from "@/lib/api";
import {toast} from "sonner";
import type {User} from "@/types/user";
import Cookies from "js-cookie";
import {getRoleEnglishNames} from "@/lib/constants/role";

interface Credentials {
    username: string;
    password: string;
}

export const useAuth = () => {
    const router = useRouter();
    const {user, setUser, permissions, setPermissions, setToken} =
        useUserStore();

    const updateUser = useCallback(async () => {
        const user = await api.get<User>("/user/me");
        setUser(user);

        const permissions = getRoleEnglishNames(user.role);
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
                router.push("/");

                // 将 user 和 permissions 存储到 cookie
                Cookies.set("user", JSON.stringify(user));
                Cookies.set("permissions", JSON.stringify(permissions));

                return true;
            } catch (error) {
                console.error("Login error:", error);
                // toast.error("登录失败");
                toast.error("用户名或密码错误");
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
                router.push("/");
                return true;
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
