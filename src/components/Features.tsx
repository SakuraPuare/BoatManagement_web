import React from "react";
import { Navigation, BarChart3, Shield, Anchor } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: <Navigation className="h-6 w-6 text-blue-600" />,
      title: "实时定位追踪",
      description: "精确掌握船舶位置，实时监控航行状态",
      bgColor: "bg-blue-100"
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-green-600" />,
      title: "数据分析",
      description: "智能分析航行数据，优化航线规划",
      bgColor: "bg-green-100"
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-600" />,
      title: "安全监控",
      description: "全方位监控船舶状态，及时预警风险",
      bgColor: "bg-purple-100"
    },
    {
      icon: <Anchor className="h-6 w-6 text-orange-600" />,
      title: "智能调度",
      description: "优化港口调度，提高运营效率",
      bgColor: "bg-orange-100"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">系统特色功能</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 