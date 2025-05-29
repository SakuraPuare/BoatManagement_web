"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  merchantCancelGoodsOrder,
  merchantCompleteGoodsOrder,
  merchantGetGoodsOrdersPage,
} from "@/services/api/merchantOrder";
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Filter, Page } from "@/components/data-table/types";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { CheckCircle, ShoppingBag, Trash2 } from "lucide-react";
import { ORDER_STATUS } from "@/lib/constants/status";

type OrderStatus = keyof typeof ORDER_STATUS;

export default function MerchantOrdersPage() {
  // 商品订单状态
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<Page>({
    pageNumber: 1,
    pageSize: 10,
  });
  const [filter, setFilter] = useState<Filter<API.BaseGoodsOrdersVO>>({
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
  const [orders, setOrders] = useState<API.BaseGoodsOrdersVO[]>([]);

  // State for delete/cancel confirmation
  const [isProcessing, setIsProcessing] = useState<number | null>(null);

  // 获取商品订单
  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const statusValue = filter.filter.status as string;
      const response = await merchantGetGoodsOrdersPage(
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
        const pageData = response.data as API.PageBaseGoodsOrdersVO;
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

  // 订单处理函数
  const handleCancelOrder = useCallback(
    async (order: API.BaseGoodsOrdersVO) => {
      if (!order.id) return;

      setIsProcessing(order.id);
      try {
        const res = await merchantCancelGoodsOrder({ id: order.id });
        console.log(res);
        if (res.code === 200) {
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
    async (order: API.BaseGoodsOrdersVO) => {
      if (!order.id) return;

      setIsProcessing(order.id);
      try {
        const res = await merchantCompleteGoodsOrder({ id: order.id });
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

  // 订单列定义
  const columns: ColumnDef<API.BaseGoodsOrdersVO>[] = [
    {
      id: "id",
      header: "订单ID",
      accessorKey: "id",
      enableSorting: true,
    },
    {
      id: "userId",
      header: "用户ID",
      accessorKey: "userId",
      enableSorting: true,
    },
    {
      id: "merchantId",
      header: "商家ID",
      accessorKey: "merchantId",
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
  ];

  // 订单行操作
  const getActions = (row: API.BaseGoodsOrdersVO) => {
    const actions = [];

    // 只有待处理和处理中的订单可以取消
    if (["PENDING", "PROCESSING"].includes(row.status as string)) {
      actions.push({
        label: "取消订单",
        icon: <Trash2 className="h-4 w-4 mr-2" />,
        onClick: () => handleCancelOrder(row),
        disabled: isProcessing === row.id,
      });
    }

    // 只有处理中的订单可以完成
    if (row.status === "PROCESSING") {
      actions.push({
        label: "完成订单",
        icon: <CheckCircle className="h-4 w-4 mr-2" />,
        onClick: () => handleCompleteOrder(row),
        disabled: isProcessing === row.id,
      });
    }

    return actions;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-6 w-6" />
          <h2 className="text-3xl font-bold tracking-tight">商品订单管理</h2>
        </div>
      </div>

      <DataTable<API.BaseGoodsOrdersVO>
        title="商品订单"
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
    </div>
  );
}
