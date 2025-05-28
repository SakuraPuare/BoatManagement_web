"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  merchantCancelOrder,
  merchantCompleteOrder,
  merchantGetOrdersPage,
} from "@/services/api/merchantOrder";
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Filter, Page } from "@/components/data-table/types";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { CheckCircle, Ship, ShoppingBag, Trash2 } from "lucide-react";
import { ORDER_STATUS } from "@/lib/constants/status";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type OrderStatus = keyof typeof ORDER_STATUS;

export default function MerchantOrdersPage() {
  const [activeTab, setActiveTab] = useState<"boat" | "goods">("boat");

  // State for data table
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<Page>({
    pageNumber: 1,
    pageSize: 10,
  });
  const [filter, setFilter] = useState<Filter<API.BaseBoatOrdersVO>>({
    filter: {},
    filterOptions: [
      {
        id: "status",
        label: "状态",
        options: [
          { value: "all", label: "全部状态" },
          ...Object.entries(ORDER_STATUS).map(([value, config]) => ({
            value: value,
            label: config.label,
          })),
        ],
      },
    ],
    search: null,
    sort: null,
    startDateTime: null,
    endDateTime: null,
  });
  const [orders, setOrders] = useState<API.BaseBoatOrdersVO[]>([]);

  // State for delete/cancel confirmation
  const [isProcessing, setIsProcessing] = useState<number | null>(null);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const statusValue = filter.filter.status as string;
      const response = await merchantGetOrdersPage(
        {
          pageNum: page.pageNumber || 1,
          pageSize: page.pageSize || 10,
          ...(filter.search && { search: filter.search }),
          ...(filter.sort && { sort: filter.sort }),
          ...(filter.startDateTime && { startDateTime: filter.startDateTime }),
          ...(filter.endDateTime && { endDateTime: filter.endDateTime }),
        },
        { status: statusValue === "all" ? undefined : statusValue }
      );

      if (response.data) {
        const pageData = response.data as API.PageBaseBoatOrdersVO;
        setPage({
          pageNumber: pageData.pageNumber || 1,
          pageSize: pageData.pageSize || 10,
          totalPage: pageData.totalPage,
          totalRow: pageData.totalRow,
        });

        setOrders(pageData.records || []);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      toast.error("获取订单列表失败");
    } finally {
      setIsLoading(false);
    }
  }, [filter, page.pageNumber, page.pageSize]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // 处理函数
  const handleCancelOrder = useCallback(
    async (order: API.BaseBoatOrdersVO) => {
      if (!order.orderId) return;

      setIsProcessing(order.orderId);
      try {
        const res = await merchantCancelOrder({ id: order.orderId });
        if (res.data) {
          toast.success("取消订单成功");
          fetchOrders();
        } else {
          toast.error("取消订单失败");
        }
      } catch (error) {
        console.error("Failed to cancel order:", error);
        toast.error("取消订单失败");
      } finally {
        setIsProcessing(null);
      }
    },
    [fetchOrders]
  );

  const handleCompleteOrder = useCallback(
    async (order: API.BaseBoatOrdersVO) => {
      if (!order.orderId) return;

      setIsProcessing(order.orderId);
      try {
        const res = await merchantCompleteOrder({ id: order.orderId });
        if (res.data) {
          toast.success("完成订单成功");
          fetchOrders();
        } else {
          toast.error("完成订单失败");
        }
      } catch (error) {
        console.error("Failed to complete order:", error);
        toast.error("完成订单失败");
      } finally {
        setIsProcessing(null);
      }
    },
    [fetchOrders]
  );

  // Table columns definition
  const columns: ColumnDef<API.BaseBoatOrdersVO>[] = [
    {
      id: "orderId",
      header: "订单ID",
      accessorKey: "orderId",
      enableSorting: true,
    },
    {
      id: "userId",
      header: "用户ID",
      accessorKey: "userId",
      enableSorting: true,
    },
    {
      id: "status",
      header: "状态",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status as OrderStatus;
        const statusConfig = ORDER_STATUS[status];
        return statusConfig ? (
          <Badge className={statusConfig.color}>{statusConfig.label}</Badge>
        ) : (
          <span>未知状态</span>
        );
      },
      enableSorting: true,
    },
    {
      id: "price",
      header: "价格",
      accessorKey: "price",
      cell: ({ row }) => `¥${row.original.price || 0}`,
      enableSorting: true,
    },
    {
      id: "discount",
      header: "折扣",
      accessorKey: "discount",
      cell: ({ row }) => `${row.original.discount || 0}%`,
      enableSorting: true,
    },
    {
      id: "createdAt",
      header: "创建时间",
      accessorKey: "createdAt",
      cell: ({ row }) =>
        row.original.createdAt
          ? new Date(row.original.createdAt).toLocaleString("zh-CN")
          : "-",
      enableSorting: true,
    },
    {
      id: "updatedAt",
      header: "更新时间",
      accessorKey: "updatedAt",
      cell: ({ row }) =>
        row.original.updatedAt
          ? new Date(row.original.updatedAt).toLocaleString("zh-CN")
          : "-",
      enableSorting: true,
    },
  ];

  // Table row actions with conditional display
  const getActions = (row: API.BaseBoatOrdersVO) => {
    const actions = [];

    // 只有待处理和处理中的订单可以取消
    if (["PENDING", "PROCESSING"].includes(row.status as string)) {
      actions.push({
        label: "取消订单",
        icon: <Trash2 className="h-4 w-4 mr-2" />,
        onClick: () => handleCancelOrder(row),
      });
    }

    // 只有处理中的订单可以完成
    if (row.status === "PROCESSING") {
      actions.push({
        label: "完成订单",
        icon: <CheckCircle className="h-4 w-4 mr-2" />,
        onClick: () => handleCompleteOrder(row),
      });
    }

    return actions;
  };

  // 船舶订单组件
  const BoatOrdersTab = () => {
    return (
      <DataTable<API.BaseBoatOrdersVO>
        title="船舶订单"
        loading={isLoading}
        columns={columns}
        getActions={getActions}
        data={orders}
        page={page}
        onPageChange={(pageNumber) => {
          setPage({ ...page, pageNumber });
        }}
        filter={filter}
        onFilterChange={(newFilter) => {
          setFilter(newFilter);
          setPage({ ...page, pageNumber: 1 });
        }}
      />
    );
  };

  // 商品订单组件
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
