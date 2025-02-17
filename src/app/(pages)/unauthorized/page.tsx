"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function Unauthorized() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Lock className="mx-auto h-16 w-16 text-yellow-600" />
        <h1 className="mt-6 text-4xl font-bold text-gray-900">401</h1>
        <p className="mt-3 text-xl text-gray-600">未授权访问</p>
        <p className="mt-2 text-gray-500">
          您没有权限访问此页面，请先登录或联系管理员。
        </p>
        <div className="mt-6 space-x-4">
          <Button onClick={() => router.push("/login")}>去登录</Button>
          <Button variant="outline" onClick={() => router.push("/")}>
            返回首页
          </Button>
        </div>
      </div>
    </div>
  );
}
