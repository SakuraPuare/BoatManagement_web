import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Ship, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
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
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            智能化船舶管理
            <span className="text-blue-600 block">新时代</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            采用先进的物联网技术和人工智能算法，为船舶运营商、码头管理者和乘客提供全方位的数字化管理平台，
            实现船舶调度、订单管理、商品销售的智能化运营。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 py-3"
              onClick={handleExperience}
            >
              {isAuthenticated ? "进入系统" : "立即体验"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            {!isAuthenticated && (
              <Link href="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-3"
                >
                  登录系统
                </Button>
              </Link>
            )}
            <Link href="/contact">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                联系我们
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Ship className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">船舶管理</h3>
            <p className="text-gray-600">
              智能调度系统，实时监控船舶状态，优化运营效率
            </p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Users className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">用户服务</h3>
            <p className="text-gray-600">
              便捷的预订系统，为乘客提供优质的出行体验
            </p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <MapPin className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">码头网络</h3>
            <p className="text-gray-600">
              覆盖主要码头，构建完善的水上交通网络
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
