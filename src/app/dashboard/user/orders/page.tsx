"use client";

import { Package, Ship } from "lucide-react";
import type { API } from "@/services/api/typings";
import { 
    getUserGoodsOrdersPageQuery,
  cancelUserGoodsOrder,
  payUserGoodsOrder,
  getUserBoatOrdersPageQuery,
  cancelUserBoatOrder,
  payUserBoatOrders
} from "@/services/api/userOrder";
import { DataManagementTable, type Column, type TableRow } from "@/components/data-management-table";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ORDER_STATUS } from "@/lib/constants/status";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const columns: Column<API.BaseGoodsOrdersVO>[] = [
  {
    accessor: "id",
    header: "订单ID",
  },
  {
    accessor: "merchantId",
    header: "商家ID",
  },
  {
    accessor: "price",
    header: "价格",
    render: (price) => <span>¥{price}</span>,
  },
  {
    accessor: "discount",
    header: "折扣",
    render: (discount) => <span>{discount || 1}折</span>,
  },
  {
    accessor: "status",
    header: "状态",
    render: (status) => {
      const { label, color } =
        ORDER_STATUS[status as keyof typeof ORDER_STATUS] || {
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
  },
  {
    accessor: "id.",
    header: "操作",
    render: (_: any, row?: TableRow<API.BaseGoodsOrdersVO>) => {
      if (!row) return null;
      const { status, id } = row.data;

      const handlePay = async () => {
        try {
          await payUserGoodsOrder({ id: id! });
          toast.success("支付成功");
          window.location.reload();
        } catch (error) {
          toast.error("支付失败");
        }
      };

      const handleCancel = async () => {
        try {
          await cancelUserGoodsOrder({ id: id! });
          toast.success("取消成功");
          window.location.reload();
        } catch (error) {
          toast.error("取消失败");
        }
      };

      return (
        <div className="flex justify-end space-x-2">
          {status === "PENDING" && (
            <>
              <Button variant="default" size="sm" onClick={handlePay}>
                支付
              </Button>
              <Button variant="destructive" size="sm" onClick={handleCancel}>
                取消
              </Button>
            </>
          )}
        </div>
      );
    },
  },
];

const boatColumns: Column<API.BaseBoatOrdersVO>[] = [
  {
    accessor: "id",
    header: "订单ID",
  },
  {
    accessor: "userId",
    header: "用户ID",
  },
  {
    accessor: "boatId",
    header: "船只ID",
  },
  {
    accessor: "price",
    header: "价格",
    render: (price) => <span>¥{price}</span>,
  },
  {
    accessor: "discount",
    header: "折扣",
    render: (discount) => <span>{discount || 1}折</span>,
  },
  {
    accessor: "requestId",
    header: "请求ID",
  },
  {
    accessor: "orderId",
    header: "订单编号",
  },
  {
    accessor: "status",
    header: "状态",
    render: (status) => {
      const { label, color } =
        ORDER_STATUS[status as keyof typeof ORDER_STATUS] || {
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
  },
  {
    accessor: "id.",
    header: "操作",
    render: (_: any, row?: TableRow<API.BaseBoatOrdersVO>) => {
      if (!row) return null;
      const { status, id } = row.data;

      const handlePay = async () => {
        try {
          await payUserBoatOrders({ id: id! });
          toast.success("支付成功");
          window.location.reload();
        } catch (error) {
          toast.error("支付失败");
        }
      };

      const handleCancel = async () => {
        try {
          await cancelUserBoatOrder({ id: id! });
          toast.success("取消成功");
          window.location.reload();
        } catch (error) {
          toast.error("取消失败");
        }
      };

      return (
        <div className="flex justify-end space-x-2">
          {status === "PENDING" && (
            <>
              <Button variant="default" size="sm" onClick={handlePay}>
                支付
              </Button>
              <Button variant="destructive" size="sm" onClick={handleCancel}>
                取消
              </Button>
            </>
          )}
        </div>
      );
    },
  },
];

export default function UserOrdersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [orderType, setOrderType] = useState<"goods" | "boat">("goods");

  return (
    <div className="space-y-4">
      <Tabs defaultValue="goods" onValueChange={(value) => setOrderType(value as "goods" | "boat")}>
        <TabsList>
          <TabsTrigger value="goods">商品订单</TabsTrigger>
          <TabsTrigger value="boat">船舶订单</TabsTrigger>
        </TabsList>
        <TabsContent value="goods">
          <DataManagementTable
            title="商品订单"
            icon={<Package className="h-6 w-6" />}
            columns={columns}
            isLoading={isLoading}
            searchPlaceholder="搜索订单..."
            queryFn={async ({ pageNum, pageSize }, searchQuery) => {
              const response = await getUserGoodsOrdersPageQuery(
                { pageNum, pageSize },
                { status: statusFilter !== "all" ? statusFilter : undefined }
              );
              return {
                list: response.data?.data?.records || [],
                totalItems: response.data?.data?.records?.length || 0,
                totalPages: response.data?.data?.totalPage || 0,
              };
            }}
            statusFilter={{
              value: statusFilter,
              onChange: setStatusFilter,
              options: [
                { value: "all", label: "全部状态" },
                { value: "PENDING", label: "待支付" },
                { value: "PAID", label: "已支付" },
                { value: "COMPLETED", label: "已完成" },
                { value: "CANCELLED", label: "已取消" },
              ],
            }}
            pagination={{
              currentPage,
              totalPages: 1,
              totalItems: 0,
              onPageChange: setCurrentPage,
            }}
          />
        </TabsContent>
        <TabsContent value="boat">
          <DataManagementTable
            title="船舶订单"
            icon={<Ship className="h-6 w-6" />}
            columns={boatColumns}
            isLoading={isLoading}
            searchPlaceholder="搜索订单..."
            queryFn={async ({ pageNum, pageSize }, searchQuery) => {
              const response = await getUserBoatOrdersPageQuery(
                { pageNum, pageSize },
                { status: statusFilter !== "all" ? statusFilter : undefined }
              );
              return {
                list: response.data?.data?.records || [],
                totalItems: response.data?.data?.records?.length || 0,
                totalPages: response.data?.data?.totalPage || 0,
              };
            }}
            statusFilter={{
              value: statusFilter,
              onChange: setStatusFilter,
              options: [
                { value: "all", label: "全部状态" },
                { value: "PENDING", label: "待支付" },
                { value: "PAID", label: "已支付" },
                { value: "COMPLETED", label: "已完成" },
                { value: "CANCELLED", label: "已取消" },
              ],
            }}
            pagination={{
              currentPage,
              totalPages: 1,
              totalItems: 0,
              onPageChange: setCurrentPage,
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
} 