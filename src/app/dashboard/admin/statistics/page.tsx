import React, { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  Building2,
  DollarSign,
  Package,
  Ship,
  ShoppingCart,
  Store,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { toast } from "sonner";



interface SystemStats {
  users: {
    total: number;
    active: number;
    blocked: number;
    growth: number;
  };
  units: {
    total: number;
    enabled: number;
    growth: number;
  };
  merchants: {
    total: number;
    active: number;
    growth: number;
  };
  boats: {
    total: number;
    available: number;
    growth: number;
  };
  goods: {
    total: number;
    enabled: number;
    growth: number;
  };
  orders: {
    total: number;
    completed: number;
    revenue: number;
    growth: number;
  };
}

export default function AdminStatisticsPage() {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    try {
      // TODO: 实现获取系统统计数据的API调用
      // 这里模拟API响应
      const mockStats: SystemStats = {
        users: {
          total: 1250,
          active: 1180,
          blocked: 15,
          growth: 12.5,
        },
        units: {
          total: 85,
          enabled: 78,
          growth: 8.2,
        },
        merchants: {
          total: 156,
          active: 142,
          growth: 15.3,
        },
        boats: {
          total: 324,
          available: 298,
          growth: 6.7,
        },
        goods: {
          total: 2840,
          enabled: 2650,
          growth: 22.1,
        },
        orders: {
          total: 5680,
          completed: 5234,
          revenue: 1250000,
          growth: 18.9,
        },
      };

      setStats(mockStats);
    } catch (error) {
      console.error(error);
      toast.error("获取统计数据失败");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("zh-CN", {
      style: "currency",
      currency: "CNY",
    }).format(amount);
  };

  const formatGrowth = (growth: number) => {
    const isPositive = growth >= 0;
    return (
      <div
        className={`flex items-center gap-1 ${
          isPositive ? "text-green-600" : "text-red-600"
        }`}
      >
        {isPositive ? (
          <TrendingUp className="w-4 h-4" />
        ) : (
          <TrendingDown className="w-4 h-4" />
        )}
        <span className="text-sm font-medium">
          {isPositive ? "+" : ""}
          {growth.toFixed(1)}%
        </span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">加载中...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-muted-foreground">暂无统计数据</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">系统统计</h1>
          <p className="text-muted-foreground">查看系统整体运营数据和趋势</p>
        </div>
      </div>

      {/* 核心指标 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总用户数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.users.total.toLocaleString()}
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">
                活跃: {stats.users.active} | 封禁: {stats.users.blocked}
              </p>
              {formatGrowth(stats.users.growth)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总单位数</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.units.total}</div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">
                启用: {stats.units.enabled}
              </p>
              {formatGrowth(stats.units.growth)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">商户数量</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.merchants.total}</div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">
                活跃: {stats.merchants.active}
              </p>
              {formatGrowth(stats.merchants.growth)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总收入</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stats.orders.revenue)}
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">本月收入</p>
              {formatGrowth(stats.orders.growth)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 详细统计 */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ship className="w-5 h-5" />
              船舶统计
            </CardTitle>
            <CardDescription>船舶相关数据统计</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">总船舶数</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">{stats.boats.total}</span>
                {formatGrowth(stats.boats.growth)}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">可用船舶</span>
              <Badge variant="default">{stats.boats.available}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">使用中</span>
              <Badge variant="secondary">
                {stats.boats.total - stats.boats.available}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              商品统计
            </CardTitle>
            <CardDescription>商品相关数据统计</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">总商品数</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">
                  {stats.goods.total.toLocaleString()}
                </span>
                {formatGrowth(stats.goods.growth)}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">在售商品</span>
              <Badge variant="default">
                {stats.goods.enabled.toLocaleString()}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">下架商品</span>
              <Badge variant="secondary">
                {(stats.goods.total - stats.goods.enabled).toLocaleString()}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              订单统计
            </CardTitle>
            <CardDescription>订单相关数据统计</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">总订单数</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">
                  {stats.orders.total.toLocaleString()}
                </span>
                {formatGrowth(stats.orders.growth)}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">已完成</span>
              <Badge variant="default">
                {stats.orders.completed.toLocaleString()}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">完成率</span>
              <Badge variant="outline">
                {((stats.orders.completed / stats.orders.total) * 100).toFixed(
                  1
                )}
                %
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              系统活跃度
            </CardTitle>
            <CardDescription>系统整体活跃度指标</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">用户活跃率</span>
              <Badge variant="default">
                {((stats.users.active / stats.users.total) * 100).toFixed(1)}%
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">商户活跃率</span>
              <Badge variant="outline">
                {(
                  (stats.merchants.active / stats.merchants.total) *
                  100
                ).toFixed(1)}
                %
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">船舶利用率</span>
              <Badge variant="secondary">
                {(
                  ((stats.boats.total - stats.boats.available) /
                    stats.boats.total) *
                  100
                ).toFixed(1)}
                %
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 系统健康状态 */}
      <Card>
        <CardHeader>
          <CardTitle>系统健康状态</CardTitle>
          <CardDescription>系统各模块运行状态概览</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm font-medium">用户模块</span>
              <Badge variant="default">正常</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm font-medium">订单模块</span>
              <Badge variant="default">正常</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm font-medium">船舶模块</span>
              <Badge variant="default">正常</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm font-medium">商品模块</span>
              <Badge variant="default">正常</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm font-medium">支付模块</span>
              <Badge variant="default">正常</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm font-medium">通知模块</span>
              <Badge variant="default">正常</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
