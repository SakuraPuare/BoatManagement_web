"use client"

import { Home, Users, Settings, Shield, Activity, TrendingUp, AlertCircle } from "lucide-react"
import { DashboardLayout } from "@/components/layouts/DashboardLayout"
import { cn } from "@/lib/utils"

const sidebarItems = [
  {
    title: "主页",
    path: "/dashboard/admin",
    icon: <Home className="w-5 h-5" />,
  },
  {
    title: "用户管理",
    path: "/dashboard/admin/users",
    icon: <Users className="w-5 h-5" />,
  },
  {
    title: "系统监控",
    path: "/dashboard/admin/monitor",
    icon: <Activity className="w-5 h-5" />,
  },
  {
    title: "权限管理",
    path: "/dashboard/admin/permissions",
    icon: <Shield className="w-5 h-5" />,
  },
  {
    title: "系统设置",
    path: "/dashboard/admin/settings",
    icon: <Settings className="w-5 h-5" />,
  },
]

export default function AdminDashboard() {
  return (
    <DashboardLayout title="管理员控制台" sidebarItems={sidebarItems}>
      <div className="grid gap-6">
        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="总用户数"
            value="12,345"
            trend="+12%"
            icon={<Users className="w-6 h-6" />}
          />
          <StatCard
            title="活跃用户"
            value="5,678"
            trend="+8%"
            icon={<Activity className="w-6 h-6" />}
          />
          <StatCard
            title="系统性能"
            value="98.5%"
            trend="+2%"
            icon={<TrendingUp className="w-6 h-6" />}
          />
          <StatCard
            title="告警数量"
            value="3"
            trend="-25%"
            icon={<AlertCircle className="w-6 h-6" />}
            trendDown
          />
        </div>

        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              系统状态
            </h2>
            <div className="space-y-4">
              <StatusItem label="CPU 使用率" value="45%" />
              <StatusItem label="内存使用" value="6.2GB / 16GB" />
              <StatusItem label="磁盘空间" value="234GB / 512GB" />
              <StatusItem label="网络流量" value="1.2MB/s" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              最近活动
            </h2>
            <div className="space-y-4">
              <ActivityItem
                title="系统更新"
                description="完成系统安全更新"
                time="10分钟前"
              />
              <ActivityItem
                title="新用户注册"
                description="新增3位用户注册"
                time="30分钟前"
              />
              <ActivityItem
                title="数据备份"
                description="自动备份完成"
                time="1小时前"
              />
              <ActivityItem
                title="性能优化"
                description="数据库性能优化完成"
                time="2小时前"
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

function StatCard({ title, value, trend, icon, trendDown = false }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            {icon}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {title}
            </p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {value}
            </p>
          </div>
        </div>
        <div
          className={cn(
            "text-sm font-medium",
            trendDown ? "text-red-500" : "text-green-500"
          )}
        >
          {trend}
        </div>
      </div>
    </div>
  )
}

function StatusItem({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-600 dark:text-gray-400">{label}</span>
      <span className="font-medium text-gray-900 dark:text-white">{value}</span>
    </div>
  )
}

function ActivityItem({ title, description, time }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
      <div className="flex-1">
        <p className="font-medium text-gray-900 dark:text-white">{title}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  )
} 