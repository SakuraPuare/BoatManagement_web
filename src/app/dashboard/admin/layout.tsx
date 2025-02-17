import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import {
  Anchor,
  BarChart,
  Bell,
  FileText,
  Radio,
  Settings,
  Ship,
  ShoppingBag,
  Ticket,
  Users,
} from "lucide-react";

const sidebarItems = [
  {
    title: "仪表板",
    path: "/dashboard/admin",
    icon: <BarChart className="h-4 w-4" />,
  },
  {
    title: "用户管理",
    path: "/dashboard/admin/users",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "码头管理",
    path: "/dashboard/admin/docks",
    icon: <Anchor className="h-4 w-4" />,
  },
  {
    title: "船只类型",
    path: "/dashboard/admin/boat-types",
    icon: <Settings className="h-4 w-4" />,
  },
  {
    title: "船只管理",
    path: "/dashboard/admin/boats",
    icon: <Ship className="h-4 w-4" />,
  },
  {
    title: "船票管理",
    path: "/dashboard/admin/tickets",
    icon: <Ticket className="h-4 w-4" />,
  },
  {
    title: "订单管理",
    path: "/dashboard/admin/orders",
    icon: <ShoppingBag className="h-4 w-4" />,
  },
  {
    title: "设备管理",
    path: "/dashboard/admin/devices",
    icon: <Radio className="h-4 w-4" />,
  },
  {
    title: "告警管理",
    path: "/dashboard/admin/alerts",
    icon: <Bell className="h-4 w-4" />,
  },
  {
    title: "日志管理",
    path: "/dashboard/admin/logs",
    icon: <FileText className="h-4 w-4" />,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout sidebarItems={sidebarItems} title="管理员控制台">
      {children}
    </DashboardLayout>
  );
}
