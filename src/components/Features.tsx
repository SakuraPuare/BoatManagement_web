import React from "react";
import {
  Anchor,
  BarChart3,
  Calendar,
  Navigation,
  Shield,
  ShoppingCart,
} from "lucide-react";

const features = [
  {
    icon: Navigation,
    title: "实时定位追踪",
    description: "精确掌握船舶位置，实时监控航行状态",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Calendar,
    title: "智能预订",
    description: "支持实时预订和预约预订，智能匹配最优船舶资源",
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: BarChart3,
    title: "数据分析",
    description: "智能分析航行数据，优化航线规划，全面的运营数据分析",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: Shield,
    title: "安全监控",
    description: "全方位监控船舶状态，及时预警风险，多重安全保障",
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    icon: Anchor,
    title: "智能调度",
    description: "优化港口调度，提高运营效率，智能匹配最优资源",
    bgColor: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    icon: ShoppingCart,
    title: "商品销售",
    description: "集成商品销售系统，为乘客提供便民服务",
    bgColor: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            系统特色功能
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            全面的功能模块，满足船舶管理的各种需求
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div
                  className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center`}
                >
                  <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-3">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
