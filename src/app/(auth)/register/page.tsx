import React, { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { checkAvailability, sendCode } from "@/services/api/authController";
import { Lock, Ship, User } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function RegisterPage() {
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeLoading, setIsCodeLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [showVerifyCode, setShowVerifyCode] = useState(false);

  // 防重复提交
  const isSubmittingRef = useRef(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // 防重复提交检查
    if (isSubmittingRef.current || isLoading) {
      console.log("防重复提交：请求已在处理中");
      return;
    }

    if (usernameError) {
      toast.error("请解决用户名问题后再注册");
      return;
    }

    if (!username.trim()) {
      toast.error("请输入用户名");
      return;
    }

    // 验证密码
    if (showVerifyCode) {
      if (!verifyCode.trim()) {
        toast.error("请输入验证码");
        return;
      }
    } else {
      if (!password.trim()) {
        toast.error("请输入密码");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("两次输入的密码不一致");
        return;
      }
      if (password.length < 6) {
        toast.error("密码长度不能少于6位");
        return;
      }
    }

    // 设置提交状态
    isSubmittingRef.current = true;
    setIsLoading(true);

    console.log("开始注册请求:", username.trim());

    try {
      await register({
        username: username.trim(),
        password: showVerifyCode ? verifyCode.trim() : password.trim(),
      });
    } catch (error) {
      console.error("注册失败:", error);
    } finally {
      setIsLoading(false);
      // 延迟重置提交状态，防止快速重复点击
      setTimeout(() => {
        isSubmittingRef.current = false;
        console.log("重置提交状态");
      }, 2000);
    }
  };

  const handleSendCode = async () => {
    if (!username.trim()) {
      toast.error("请输入手机号或邮箱");
      return;
    }

    if (!needVerifyCode(username.trim())) {
      toast.error("请输入正确的手机号或邮箱");
      return;
    }

    setIsCodeLoading(true);
    try {
      const response = await sendCode({
        username: username.trim(),
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

  const needVerifyCode = (username: string) => {
    // 检查是否为手机号或邮箱
    return (
      username.match(/^(?:0|86|\+86)?1[3-9]\d{9}$/) !== null ||
      username.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) !==
        null
    );
  };

  const checkUsername = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (username: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () => {
          if (!username) {
            setUsernameError("");
            return;
          }

          try {
            const response = await checkAvailability({
              username: username.trim(),
            });

            if (response.code === 200) {
              if (response.data) {
                setUsernameError("");
              } else {
                setUsernameError("用户名已被使用");
              }
            } else {
              setUsernameError(response.message || "检查用户名失败");
            }
          } catch (err) {
            console.error("检查用户名失败:", err);
            setUsernameError("检查用户名失败");
          }
        }, 300);
      };
    })(),
    [setUsernameError]
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <Ship className="h-12 w-12 text-blue-600" />
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
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
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
            )}

            {!showVerifyCode && (
              <>
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
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="确认密码"
                    className="pl-10"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </>
            )}
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
