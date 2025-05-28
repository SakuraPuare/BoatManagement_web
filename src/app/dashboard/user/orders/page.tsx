"use client";

import React, { useCallback, useEffect, useState } from "react";
import { DollarSign, Package, Ship, X } from "lucide-react";
import {
  userCancelBoatOrder,
  userCancelGoodsOrder,
  userGetBoatOrdersPage,
  userGetGoodsOrdersPage,
  userPayBoatOrder,
  userPayGoodsOrder,
} from "@/services/api/userOrder";
import { toast } from "sonner";
import { ORDER_STATUS } from "@/lib/constants/status";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Filter, Page } from "@/components/data-table/types";

// 商品订单页面组件
function GoodsOrdersTab() {
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
        label: "订单状态",
        options: [
          { value: "UNPAID", label: "待支付" },
          { value: "PAID", label: "已支付" },
          { value: "COMPLETED", label: "已完成" },
          { value: "CANCELLED", label: "已取消" },
        ],
      },
    ],
    search: null,
    sort: null,
    startDateTime: null,
    endDateTime: null,
  });
  const [orders, setOrders] = useState<API.BaseGoodsOrdersVO[]>([]);

  // 获取订单数据
  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await userGetGoodsOrdersPage({
        pageNum: page.pageNumber || 1,
        pageSize: page.pageSize || 10,
        status: filter.filter.status,
        ...(filter.search && { search: filter.search }),
        ...(filter.sort && { sort: filter.sort }),
        ...(filter.startDateTime && { startDateTime: filter.startDateTime }),
        ...(filter.endDateTime && { endDateTime: filter.endDateTime }),
      });

      const pageData = res.data as API.PageBaseGoodsOrdersVO;
      setPage({
        pageNumber: pageData?.pageNumber || 1,
        pageSize: pageData?.pageSize || 10,
        totalPage: pageData?.totalPage,
        totalRow: pageData?.totalRow,
      });

      setOrders(pageData?.records || []);
    } catch (error) {
      console.error("Failed to fetch goods orders:", error);
      toast.error("获取商品订单失败");
    } finally {
      setIsLoading(false);
    }
  }, [filter, page.pageNumber, page.pageSize]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // 处理支付
  const handlePay = useCallback(
    async (order: API.BaseGoodsOrdersVO) => {
      if (!order.id) return;
      try {
        await userPayGoodsOrder({ id: order.id });
        toast.success("支付成功");
        fetchOrders();
      } catch (error) {
        toast.error("支付失败");
      }
    },
    [fetchOrders]
  );

  // 处理取消订单
  const handleCancel = useCallback(
    async (order: API.BaseGoodsOrdersVO) => {
      if (!order.id) return;
      try {
        await userCancelGoodsOrder({ id: order.id });
        toast.success("取消成功");
        fetchOrders();
      } catch (error) {
        toast.error("取消失败");
      }
    },
    [fetchOrders]
  );

  // 商品订单列定义
  const columns: ColumnDef<API.BaseGoodsOrdersVO>[] = [
    {
      id: "id",
      header: "订单ID",
      accessorKey: "id",
      enableSorting: true,
    },
    {
      id: "merchantId",
      header: "商家ID",
      accessorKey: "merchantId",
      enableSorting: true,
    },
    {
      id: "price",
      header: "价格",
      accessorKey: "price",
      cell: ({ row }) => <span>¥{row.original.price}</span>,
      enableSorting: true,
    },
    {
      id: "discount",
      header: "折扣",
      accessorKey: "discount",
      cell: ({ row }) => <span>{row.original.discount || 1}折</span>,
      enableSorting: true,
    },
    {
      id: "status",
      header: "状态",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status;
        const { label, color } = ORDER_STATUS[
          status as keyof typeof ORDER_STATUS
        ] || {
          label: status,
          color: "",
        };
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}
          >
            {label}
          </span>
        );
      },
      enableSorting: true,
    },
  ];

  // 行操作
  const actions = [
    {
      label: (row: API.BaseGoodsOrdersVO) => "支付",
      icon: <DollarSign className="mr-2 h-4 w-4" />,
      onClick: handlePay,
      disabled: (row: API.BaseGoodsOrdersVO) => row.status !== "UNPAID",
    },
    {
      label: (row: API.BaseGoodsOrdersVO) => "取消",
      icon: <X className="mr-2 h-4 w-4 text-red-500" />,
      onClick: handleCancel,
      className: "text-red-500",
      disabled: (row: API.BaseGoodsOrdersVO) => row.status !== "UNPAID",
    },
  ];

  return (
    <DataTable<API.BaseGoodsOrdersVO>
      title="商品订单"
      loading={isLoading}
      columns={columns}
      actions={actions}
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
}

// 船舶订单页面组件
function BoatOrdersTab() {
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
        label: "订单状态",
        options: [
          { value: "UNPAID", label: "待支付" },
          { value: "PAID", label: "已支付" },
          { value: "COMPLETED", label: "已完成" },
          { value: "CANCELLED", label: "已取消" },
        ],
      },
    ],
    search: null,
    sort: null,
    startDateTime: null,
    endDateTime: null,
  });
  const [orders, setOrders] = useState<API.BaseBoatOrdersVO[]>([]);

  // 获取订单数据
  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await userGetBoatOrdersPage({
        pageNum: page.pageNumber || 1,
        pageSize: page.pageSize || 10,
        status: filter.filter.status,
        ...(filter.search && { search: filter.search }),
        ...(filter.sort && { sort: filter.sort }),
        ...(filter.startDateTime && { startDateTime: filter.startDateTime }),
        ...(filter.endDateTime && { endDateTime: filter.endDateTime }),
      });

      const pageData = res.data as API.PageBaseBoatOrdersVO;
      setPage({
        pageNumber: pageData?.pageNumber || 1,
        pageSize: pageData?.pageSize || 10,
        totalPage: pageData?.totalPage,
        totalRow: pageData?.totalRow,
      });

      setOrders(pageData?.records || []);
    } catch (error) {
      console.error("Failed to fetch boat orders:", error);
      toast.error("获取船舶订单失败");
    } finally {
      setIsLoading(false);
    }
  }, [filter, page.pageNumber, page.pageSize]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // 处理支付
  const handlePay = useCallback(
    async (order: API.BaseBoatOrdersVO) => {
      if (!order.id) return;
      try {
        await userPayBoatOrder({ id: order.id });
        toast.success("支付成功");
        fetchOrders();
      } catch (error) {
        toast.error("支付失败");
      }
    },
    [fetchOrders]
  );

  // 处理取消订单
  const handleCancel = useCallback(
    async (order: API.BaseBoatOrdersVO) => {
      if (!order.id) return;
      try {
        await userCancelBoatOrder({ id: order.id });
        toast.success("取消成功");
        fetchOrders();
      } catch (error) {
        toast.error("取消失败");
      }
    },
    [fetchOrders]
  );

  // 船舶订单列定义
  const columns: ColumnDef<API.BaseBoatOrdersVO>[] = [
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
      id: "boatId",
      header: "船只ID",
      accessorKey: "boatId",
      enableSorting: true,
    },
    {
      id: "price",
      header: "价格",
      accessorKey: "price",
      cell: ({ row }) => <span>¥{row.original.price}</span>,
      enableSorting: true,
    },
    {
      id: "discount",
      header: "折扣",
      accessorKey: "discount",
      cell: ({ row }) => <span>{row.original.discount || 1}折</span>,
      enableSorting: true,
    },
    {
      id: "requestId",
      header: "请求ID",
      accessorKey: "requestId",
      enableSorting: true,
    },
    {
      id: "orderId",
      header: "订单编号",
      accessorKey: "orderId",
      enableSorting: true,
    },
    {
      id: "status",
      header: "状态",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status;
        const { label, color } = ORDER_STATUS[
          status as keyof typeof ORDER_STATUS
        ] || {
          label: status,
          color: "",
        };
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}
          >
            {label}
          </span>
        );
      },
      enableSorting: true,
    },
  ];

  // 行操作
  const actions = [
    {
      label: (row: API.BaseBoatOrdersVO) => "支付",
      icon: <DollarSign className="mr-2 h-4 w-4" />,
      onClick: handlePay,
      disabled: (row: API.BaseBoatOrdersVO) => row.status !== "UNPAID",
    },
    {
      label: (row: API.BaseBoatOrdersVO) => "取消",
      icon: <X className="mr-2 h-4 w-4 text-red-500" />,
      onClick: handleCancel,
      className: "text-red-500",
      disabled: (row: API.BaseBoatOrdersVO) => row.status !== "UNPAID",
    },
  ];

  return (
    <DataTable<API.BaseBoatOrdersVO>
      title="船舶订单"
      loading={isLoading}
      columns={columns}
      actions={actions}
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
}

export default function UserOrdersPage() {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="goods">
        <TabsList>
          <TabsTrigger value="goods">
            <Package className="mr-2 h-4 w-4" />
            商品订单
          </TabsTrigger>
          <TabsTrigger value="boat">
            <Ship className="mr-2 h-4 w-4" />
            船舶订单
          </TabsTrigger>
        </TabsList>
        <TabsContent value="goods">
          <GoodsOrdersTab />
        </TabsContent>
        <TabsContent value="boat">
          <BoatOrdersTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
