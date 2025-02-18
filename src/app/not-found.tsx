"use client";
import { Button } from "@/components/ui/button";
import { Ship } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Ship className="mx-auto h-16 w-16 text-blue-600" />
        <h1 className="mt-6 text-4xl font-bold text-gray-900">404</h1>
        <p className="mt-3 text-xl text-gray-600">页面不存在</p>
        <p className="mt-2 text-gray-500">
          抱歉，您访问的页面不存在或已被删除。
        </p>
        <div className="mt-6 space-x-4">
          <Button onClick={() => router.back()}>返回上一页</Button>
          <Button variant="outline" onClick={() => router.push("/")}>
            返回首页
          </Button>
        </div>
      </div>
    </div>
  );
}
