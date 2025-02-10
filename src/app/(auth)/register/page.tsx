"use client";

import React, {useCallback, useState} from "react";
import Link from "next/link";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Lock, Ship, User} from "lucide-react";
import {api} from "@/lib/api";
import {debounce} from "lodash";
import {toast} from "sonner";
import {useAuth} from "@/hooks/useAuth";

export default function RegisterPage() {
    const {register} = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [verifyCode, setVerifyCode] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [showVerifyCode, setShowVerifyCode] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (usernameError) return;

        if (password !== confirmPassword) {
            toast.error("两次输入的密码不一致");
            return false;
        }

        setIsLoading(true);
        try {
            await register({
                username: username.trim(),
                password,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyCode = async () => {
        console.log("handleVerifyCode");
    };

    const needVerifyCode = (username: string) => {
        // mail and phone
        return (
            username.match(/^(?:0|86|\+86)?1[3-9]\d{9}$/) !== null ||
            username.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) !==
            null
        );
    };

    const checkUsername = useCallback(
        debounce(async (username: string) => {
            if (!username) return;

            try {
                const response = await api.post("/auth/availability", {
                    body: {
                        username: username.trim(),
                    },
                });
                console.log(response);

                if (!response) {
                    setUsernameError("用户名已被使用");
                } else {
                    setUsernameError("");
                }
            } catch (err) {
                console.error("检查用户名失败:", err);
            }
        }, 300),
        [setUsernameError],
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div className="flex flex-col items-center">
                    <Ship className="h-12 w-12 text-blue-600"/>
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">注册账号</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        已有账号？{" "}
                        <Link href="/login" className="text-blue-600 hover:text-blue-500">
                            立即登录
                        </Link>
                    </p>
                </div>

                <form onSubmit={handleRegister} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400"/>
                            <Input
                                type="text"
                                placeholder="用户名/邮箱/手机号"
                                className={`pl-10 ${usernameError ? "border-red-500" : ""}`}
                                required
                                value={username}
                                onChange={(e) => {
                                    const value = e.target.value.trim();
                                    setUsername(value);
                                    setShowVerifyCode(needVerifyCode(value));
                                    checkUsername(value);
                                }}
                            />
                            {usernameError && (
                                <div className="text-red-500 text-sm mt-1">{usernameError}</div>
                            )}
                        </div>

                        {showVerifyCode && (
                            <div className="flex gap-4">
                                <Input
                                    type="text"
                                    placeholder="验证码"
                                    className="flex-1"
                                    required
                                    value={verifyCode}
                                    onChange={(e) => setVerifyCode(e.target.value.trim())}
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-32"
                                    onClick={handleVerifyCode}
                                >
                                    获取验证码
                                </Button>
                            </div>
                        )}

                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400"/>
                            <Input
                                type="password"
                                placeholder="密码"
                                className="pl-10"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value.trim())}
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400"/>
                            <Input
                                type="password"
                                placeholder="确认密码"
                                className="pl-10"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value.trim())}
                            />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input
                            id="agree-terms"
                            name="agree-terms"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 rounded border-gray-300"
                            required
                        />
                        <label htmlFor="agree-terms" className="ml-2 text-sm text-gray-600">
                            我已阅读并同意{" "}
                            <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                                服务条款
                            </Link>{" "}
                            和{" "}
                            <Link
                                href="/privacy"
                                className="text-blue-600 hover:text-blue-500"
                            >
                                隐私政策
                            </Link>
                        </label>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading || !!usernameError}
                    >
                        {isLoading ? "注册中..." : "注册"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
