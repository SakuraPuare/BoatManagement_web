"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useAuth } from "@/hooks/useAuth";
import { loginByCode, sendCode } from "@/services/api/authController";
import { Lock, QrCode, Ship, Smartphone, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function LoginPage() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeLoading, setIsCodeLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // 账号密码登录
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 验证码登录
  const [phone, setPhone] = useState("");
  const [verifyCode, setVerifyCode] = useState("");

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast.error("请输入用户名和密码");
      return;
    }

    setIsLoading(true);
    try {
      await login({
        username: username.trim(),
        password: password.trim(),
      });
    } catch (error) {
      console.error("登录失败:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone.trim() || !verifyCode.trim()) {
      toast.error("请输入手机号和验证码");
      return;
    }

    setIsLoading(true);
    try {
      const response = await loginByCode({
        username: phone.trim(),
        password: verifyCode.trim(),
      });

      if (response.code === 200) {
        await login({
          username: phone.trim(),
          password: verifyCode.trim(),
        });
      } else {
        toast.error(response.message || "验证码登录失败");
      }
    } catch (error) {
      console.error("验证码登录失败:", error);
      toast.error("登录失败，请检查网络连接");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendCode = async () => {
    if (!phone.trim()) {
      toast.error("请输入手机号");
      return;
    }

    if (!/^1[3-9]\d{9}$/.test(phone.trim())) {
      toast.error("请输入正确的手机号");
      return;
    }

    setIsCodeLoading(true);
    try {
      const response = await sendCode({
        username: phone.trim(),
      });

      if (response.code === 200) {
        toast.success("验证码已发送");
        setCountdown(60);
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        toast.error(response.message || "发送验证码失败");
      }
    } catch (error) {
      console.error("发送验证码失败:", error);
      toast.error("发送验证码失败，请检查网络连接");
    } finally {
      setIsCodeLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <Ship className="h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">登录系统</h2>
          <p className="mt-2 text-sm text-gray-600">
            还没有账号？{" "}
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-500"
            >
              立即注册
            </Link>
          </p>
        </div>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account">账号密码</TabsTrigger>
            <TabsTrigger value="phone">手机验证码</TabsTrigger>
            <TabsTrigger value="qrcode">扫码登录</TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <form onSubmit={handlePasswordLogin} className="mt-8 space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="用户名/邮箱/手机号"
                    className="pl-10"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="密码"
                    className="pl-10"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 text-sm text-gray-600"
                  >
                    记住我
                  </label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  忘记密码？
                </Link>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "登录中..." : "登录"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="phone">
            <form onSubmit={handleCodeLogin} className="mt-8 space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Smartphone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="tel"
                    placeholder="手机号码"
                    className="pl-10"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="flex gap-4">
                  <Input
                    type="text"
                    placeholder="验证码"
                    className="flex-1"
                    required
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-32"
                    onClick={handleSendCode}
                    disabled={isCodeLoading || countdown > 0}
                  >
                    {isCodeLoading
                      ? "发送中..."
                      : countdown > 0
                      ? `${countdown}s`
                      : "获取验证码"}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "登录中..." : "登录"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="qrcode" className="flex flex-col items-center">
            <div className="mt-8 p-4 border-2 border-dashed border-gray-200 rounded-lg">
              <QrCode className="w-48 h-48 text-gray-400" />
            </div>
            <p className="mt-4 text-sm text-gray-600">
              请使用手机APP扫描二维码登录
            </p>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">其他登录方式</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <button className="flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <span className="sr-only">微信登录</span>
              微信
            </button>
            <button className="flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <span className="sr-only">支付宝登录</span>
              支付宝
            </button>
            <button className="flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <span className="sr-only">企业微信登录</span>
              企业微信
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
