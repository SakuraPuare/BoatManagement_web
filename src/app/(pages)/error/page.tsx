"use client";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function ServerError() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <AlertTriangle className="mx-auto h-16 w-16 text-red-600" />
        <h1 className="mt-6 text-4xl font-bold text-gray-900">502</h1>
        <p className="mt-3 text-xl text-gray-600">服务器错误</p>
        <p className="mt-2 text-gray-500">
          抱歉，服务器出现了一些问题。请稍后再试或联系技术支持。
        </p>
        <div className="mt-6 space-x-4">
          <Button onClick={() => window.location.reload()}>刷新页面</Button>
          <Button variant="outline" onClick={() => router.push("/")}>
            返回首页
          </Button>
        </div>
      </div>
    </div>
  );
}
