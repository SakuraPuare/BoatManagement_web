import React from "react";

import { Card } from "@/components/ui/card";
import { Bell, Ship, ShoppingBag, Users } from "lucide-react";



const stats = [
  {
    title: "总用户数",
    value: "1,234",
    icon: Users,
    trend: "+12%",
  },
  {
    title: "活跃船只",
    value: "45",
    icon: Ship,
    trend: "+5%",
  },
  {
    title: "今日订单",
    value: "89",
    icon: ShoppingBag,
    trend: "+23%",
  },
  {
    title: "告警数量",
    value: "3",
    icon: Bell,
    trend: "-15%",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">管理员仪表板</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
                <p
                  className={`text-sm mt-1 ${
                    stat.trend.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.trend} 较上月
                </p>
              </div>
              <stat.icon className="h-8 w-8 text-blue-600" />
            </div>
          </Card>
        ))}
      </div>

      {/* 这里可以添加更多的图表和数据可视化组件 */}
    </div>
  );
}
