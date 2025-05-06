import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { toast } from "sonner";
export function Hero() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleExperience = () => {
    if (!isAuthenticated) {
      toast.info("请先登录");
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="pt-24 pb-16 px-4 sm:pt-32 sm:pb-24">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
          智能化船舶管理
          <span className="text-blue-600">新时代</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          采用先进的物联网技术和人工智能算法，为您提供全方位的船舶管理解决方案
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleExperience}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isAuthenticated ? "进入系统" : "立即体验"}
          </button>
          <Link
            href="/contact"
            className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            联系我们
          </Link>
        </div>
      </div>
    </div>
  );
}
