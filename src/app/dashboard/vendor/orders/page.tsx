import React, { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart } from "lucide-react";
import { DataPagination } from "@/components/ui/data-pagination";
import {
  cancelOrder1,
  completeOrder1,
  getVendorOrdersPageQuery,
  handleOrder,
} from "@/services/api/vendorOrder";
import { toast } from "sonner";
import { ORDER_STATUS } from "@/lib/constants/status";

("use client");

const ITEMS_PER_PAGE = 10;

export default function VendorOrdersPage() {
  const [orders, setOrders] = useState<API.BaseBoatOrdersVO[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getVendorOrdersPageQuery(
        { pageNum: currentPage, pageSize: ITEMS_PER_PAGE },
        {}
      );
      setOrders(response.data?.records || []);
      setTotalPages(response.data?.totalPage || 0);
    } catch (error) {
      console.error(error);
      toast.error("获取订单列表失败");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  const handleCancel = async (id: number) => {
    try {
      await cancelOrder1({ id });
      toast.success("订单已取消");
      await fetchOrders();
    } catch (error) {
      console.error(error);
      toast.error("取消订单失败");
    }
  };

  const handleComplete = async (id: number) => {
    try {
      await completeOrder1({ id });
      toast.success("订单已完成");
      await fetchOrders();
    } catch (error) {
      console.error(error);
      toast.error("完成订单失败");
    }
  };

  const handleAccept = async (requestId: number) => {
    try {
      await handleOrder(
        { requestId },
        {
          status: "PROCESSING",
        }
      );
      toast.success("订单已接受");
      await fetchOrders();
    } catch (error) {
      console.error(error);
      toast.error("接受订单失败");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-6 w-6" />
          <h1 className="text-2xl font-semibold">订单管理</h1>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="搜索订单..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>订单ID</TableHead>
              <TableHead>用户ID</TableHead>
              <TableHead>请求ID</TableHead>
              <TableHead>船只ID</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>价格(元)</TableHead>
              <TableHead>折扣</TableHead>
              <TableHead>创建时间</TableHead>
              <TableHead>更新时间</TableHead>
              <TableHead className="w-[150px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-10">
                  加载中...
                </TableCell>
              </TableRow>
            ) : orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-10">
                  暂无数据
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>{order.userId}</TableCell>
                  <TableCell>{order.requestId}</TableCell>
                  <TableCell>{order.boatId}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium min-w-[80px] ${
                        ORDER_STATUS[order.status as keyof typeof ORDER_STATUS]
                          ?.color
                      }`}
                    >
                      {
                        ORDER_STATUS[order.status as keyof typeof ORDER_STATUS]
                          ?.label
                      }
                    </span>
                  </TableCell>
                  <TableCell>{order.price?.toFixed(2)}</TableCell>
                  <TableCell>{order.discount}%</TableCell>
                  <TableCell>
                    {order.createdAt &&
                      format(new Date(order.createdAt), "yyyy-MM-dd HH:mm:ss")}
                  </TableCell>
                  <TableCell>
                    {order.updatedAt &&
                      format(new Date(order.updatedAt), "yyyy-MM-dd HH:mm:ss")}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {order.status === "PENDING" && (
                        <>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleAccept(order.requestId!)}
                          >
                            接受
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleCancel(order.id!)}
                          >
                            拒绝
                          </Button>
                        </>
                      )}
                      {order.status === "PROCESSING" && (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleComplete(order.id!)}
                        >
                          完成
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <DataPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={orders.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
