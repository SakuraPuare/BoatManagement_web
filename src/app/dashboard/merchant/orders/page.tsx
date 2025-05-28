import React, { useCallback, useEffect, useState } from "react";
import {
  merchantCancelOrder,
  merchantCompleteOrder,
  merchantGetOrdersPage,
} from "@/services/api/merchantOrder";

import { toast } from "sonner";
import { CheckCircle, Ship, ShoppingBag, Trash2 } from "lucide-react";
import { ORDER_STATUS } from "@/lib/constants/status";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";



const ITEMS_PER_PAGE = 10;

type OrderStatus = keyof typeof ORDER_STATUS;

export default function MerchantOrdersPage() {
  const [activeTab, setActiveTab] = useState<"boat" | "goods">("boat");
  const [orders, setOrders] = useState<API.BaseBoatOrdersVO[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await merchantGetOrdersPage(
        { pageNum: currentPage, pageSize: ITEMS_PER_PAGE },
        { status: statusFilter === "all" ? undefined : statusFilter }
      );
      setOrders(response.data?.records || []);
      setTotalPages(response.data?.totalPage || 0);
    } catch (error) {
      console.error(error);
      toast.error("获取订单列表失败");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, statusFilter]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const columns: Column<API.BaseBoatOrdersVO>[] = [
    { header: "订单ID", accessor: "orderId" },
    { header: "用户ID", accessor: "userId" },
    {
      header: "状态",
      accessor: "status",
      render: (value) => {
        const status = value as OrderStatus;
        const statusConfig = ORDER_STATUS[status];
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              statusConfig?.color || "bg-gray-100 text-gray-800"
            }`}
          >
            {statusConfig?.label || "未知状态"}
          </span>
        );
      },
    },
    {
      header: "价格",
      accessor: "price",
      render: (price) => <span>¥{price}</span>,
    },
    {
      header: "折扣",
      accessor: "discount",
      render: (discount) => <span>{discount}%</span>,
    },
    {
      header: "创建时间",
      accessor: "createdAt",
      render: (value) => new Date(value as string).toLocaleString("zh-CN"),
    },
    {
      header: "更新时间",
      accessor: "updatedAt",
      render: (value) => new Date(value as string).toLocaleString("zh-CN"),
    },
  ];

  // 先定义处理函数
  const handleCancelOrder = async (order: API.BaseBoatOrdersVO) => {
    try {
      const res = await merchantCancelOrder({ id: order.orderId! });
      if (res.data) {
        toast.success("取消订单成功");
        await fetchOrders(); // 刷新订单列表
      } else {
        toast.error("取消订单失败");
      }
    } catch (error) {
      console.error(error);
      toast.error("取消订单失败");
    }
  };

  const handleCompleteOrder = async (order: API.BaseBoatOrdersVO) => {
    try {
      const res = await merchantCompleteOrder({ id: order.orderId! });
      if (res.data) {
        toast.success("完成订单成功");
        await fetchOrders(); // 刷新订单列表
      } else {
        toast.error("完成订单失败");
      }
    } catch (error) {
      console.error(error);
      toast.error("完成订单失败");
    }
  };

  // 然后再定义 actions
  const actions: Action<API.BaseBoatOrdersVO>[] = [
    {
      label: "取消订单",
      onClick: handleCancelOrder,
      icon: <Trash2 className="h-4 w-4 mr-2" />,
      // 只有待处理和处理中的订单可以取消
      show: (order) =>
        ["PENDING", "PROCESSING"].includes(order.status as string),
    },
    {
      label: "完成订单",
      onClick: handleCompleteOrder,
      icon: <CheckCircle className="h-4 w-4 mr-2" />,
      // 只有处理中的订单可以完成
      show: (order) => order.status === "PROCESSING",
    },
  ];

  // 船舶订单相关代码
  const BoatOrdersTab = () => {
    return (
      <DataManagementTable
        title="船舶订单"
        icon={<Ship className="h-6 w-6" />}
        data={orders}
        columns={columns}
        actions={actions}
        isLoading={isLoading}
        searchPlaceholder="搜索订单ID..."
        statusFilter={{
          value: statusFilter,
          onChange: (value) => setStatusFilter(value as "all" | OrderStatus),
          options: [
            { value: "all", label: "全部状态" },
            ...Object.entries(ORDER_STATUS).map(([value, config]) => ({
              value: value,
              label: config.label,
            })),
          ],
        }}
        pagination={{
          currentPage,
          totalPages,
          totalItems: orders.length,
          onPageChange: setCurrentPage,
        }}
      />
    );
  };

  // 商品订单相关代码
  const GoodsOrdersTab = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
        <ShoppingBag className="h-12 w-12 mb-4" />
        <p>商品订单功能开发中...</p>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">订单管理</h2>
      </div>

      <Tabs
        defaultValue="boat"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "boat" | "goods")}
      >
        <TabsList className="grid w-[400px] grid-cols-2">
          <TabsTrigger value="boat" className="flex items-center gap-2">
            <Ship className="h-4 w-4" />
            船舶订单
          </TabsTrigger>
          <TabsTrigger value="goods" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            商品订单
          </TabsTrigger>
        </TabsList>

        <TabsContent value="boat" className="mt-6">
          <BoatOrdersTab />
        </TabsContent>

        <TabsContent value="goods" className="mt-6">
          <GoodsOrdersTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
