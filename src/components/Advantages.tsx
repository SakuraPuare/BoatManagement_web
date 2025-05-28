import React from "react";
import { CheckCircle, TrendingUp, Users, Zap } from "lucide-react";

("use client");

const advantages = [
  {
    icon: TrendingUp,
    title: "提升运营效率",
    description:
      "通过智能调度和自动化管理，显著提升船舶运营效率，降低运营成本。",
    stats: "效率提升 40%",
  },
  {
    icon: Users,
    title: "优化用户体验",
    description: "简化预订流程，提供实时信息，为用户带来更便捷的出行体验。",
    stats: "满意度 95%",
  },
  {
    icon: Zap,
    title: "快速部署",
    description: "模块化设计，支持快速部署和定制化配置，快速上线使用。",
    stats: "部署时间 < 1周",
  },
  {
    icon: CheckCircle,
    title: "稳定可靠",
    description: "经过大量实际应用验证，系统稳定可靠，支持高并发访问。",
    stats: "可用性 99.9%",
  },
];

const statsData = [
  { value: "99.9%", label: "系统稳定性" },
  { value: "24/7", label: "全天候技术支持" },
  { value: "500+", label: "服务用户数量" },
];

export function Advantages() {
  return (
    <section id="advantages" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            为什么选择我们
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            专业的技术团队，丰富的行业经验，为您提供最优质的解决方案
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="text-center bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex-shrink-0">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <advantage.icon className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {advantage.title}
                </h3>
                <p className="text-gray-600 mb-3">{advantage.description}</p>
                <div className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
                  {advantage.stats}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
