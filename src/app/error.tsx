"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertOctagon } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <AlertOctagon className="mx-auto h-16 w-16 text-red-600" />
        <h1 className="mt-6 text-4xl font-bold text-gray-900">出错了</h1>
        <p className="mt-3 text-xl text-gray-600">发生了一些错误</p>
        <p className="mt-2 text-gray-500">
          {error.message || "抱歉，请稍后再试。"}
        </p>
        <div className="mt-6 space-x-4">
          <Button onClick={() => reset()}>重试</Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            刷新页面
          </Button>
        </div>
      </div>
    </div>
  );
}
