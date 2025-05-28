"use client";

import React, { useCallback, useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import { Filter, Page } from "@/components/data-table/types";
import { adminGetBoatOrdersPage } from "@/services/api/adminOrder";
import { adminGetGoodsOrdersPage1 as adminGetGoodsOrdersPage } from "@/services/api/adminGoodsOrder";
import { adminGetUserList } from "@/services/api/adminUser";
import { Badge } from "@/components/ui/badge";
import { Eye, Package, Ship } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ORDER_STATUS } from "@/lib/constants/status";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";

type OrderStatus = keyof typeof ORDER_STATUS;

type BoatOrderWithUser = API.BaseBoatOrdersVO & {
  user?: API.BaseAccountsVO;
};

type GoodsOrderWithUser = API.BaseGoodsOrdersVO & {
  user?: API.BaseAccountsVO;
};

export default function AdminOrdersPage() {
  // Common state
  const [users, setUsers] = useState<API.BaseAccountsVO[]>([]);
  const [activeTab, setActiveTab] = useState("boat");

  // Boat orders state
  const [isBoatLoading, setIsBoatLoading] = useState(false);
  const [boatPage, setBoatPage] = useState<Page>({
    pageNumber: 1,
    pageSize: 10,
  });
  const [boatFilter, setBoatFilter] = useState<Filter<BoatOrderWithUser>>({
    filter: {},
    filterOptions: [
      {
        id: "status",
        label: "订单状态",
        options: [
          { label: "全部", value: "" },
          ...Object.entries(ORDER_STATUS).map(([key, value]) => ({
            label: value.label,
            value: key,
          })),
        ],
      },
    ],
    search: null,
    sort: null,
    startDateTime: null,
    endDateTime: null,
  });
  const [boatOrdersWithUser, setBoatOrdersWithUser] = useState<
    BoatOrderWithUser[]
  >([]);
  const [selectedBoatOrder, setSelectedBoatOrder] =
    useState<BoatOrderWithUser | null>(null);
  const [isBoatDetailDialogOpen, setIsBoatDetailDialogOpen] = useState(false);

  // Goods orders state
  const [isGoodsLoading, setIsGoodsLoading] = useState(false);
  const [goodsPage, setGoodsPage] = useState<Page>({
    pageNumber: 1,
    pageSize: 10,
  });
  const [goodsFilter, setGoodsFilter] = useState<Filter<GoodsOrderWithUser>>({
    filter: {},
    filterOptions: [
      {
        id: "status",
        label: "订单状态",
        options: [
          { label: "全部", value: "" },
          ...Object.entries(ORDER_STATUS).map(([key, value]) => ({
            label: value.label,
            value: key,
          })),
        ],
      },
    ],
    search: null,
    sort: null,
    startDateTime: null,
    endDateTime: null,
  });
  const [goodsOrdersWithUser, setGoodsOrdersWithUser] = useState<
    GoodsOrderWithUser[]
  >([]);
  const [selectedGoodsOrder, setSelectedGoodsOrder] =
    useState<GoodsOrderWithUser | null>(null);
  const [isGoodsDetailDialogOpen, setIsGoodsDetailDialogOpen] = useState(false);

  // Fetch users data
  const fetchUsers = useCallback(async () => {
    try {
      const response = await adminGetUserList({}, {});
      setUsers((response.data as API.BaseAccountsVO[]) || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  }, []);

  // Fetch boat orders data
  const fetchBoatOrders = useCallback(async () => {
    setIsBoatLoading(true);
    try {
      const res = await adminGetBoatOrdersPage(
        {
          pageNum: boatPage.pageNumber || 1,
          pageSize: boatPage.pageSize || 10,
          ...(boatFilter.search && { search: boatFilter.search }),
          ...(boatFilter.sort && { sort: boatFilter.sort }),
          ...(boatFilter.startDateTime && {
            startDateTime: boatFilter.startDateTime,
          }),
          ...(boatFilter.endDateTime && {
            endDateTime: boatFilter.endDateTime,
          }),
        },
        {
          ...(boatFilter.filter.status && { status: boatFilter.filter.status }),
        }
      );

      if (res.data) {
        const pageData = res.data as API.PageBaseBoatOrdersVO;
        setBoatPage({
          pageNumber: pageData.pageNumber || 1,
          pageSize: pageData.pageSize || 10,
          totalPage: pageData.totalPage,
          totalRow: pageData.totalRow,
        });

        // Map orders with users
        const ordersWithUser = (pageData.records || []).map((order) => {
          const user = users.find((u) => u.id === order.userId);
          return { ...order, user };
        });
        setBoatOrdersWithUser(ordersWithUser);
      }
    } catch (error) {
      console.error("Failed to fetch boat orders:", error);
      toast.error("获取船舶订单失败");
    } finally {
      setIsBoatLoading(false);
    }
  }, [boatFilter, boatPage.pageNumber, boatPage.pageSize, users]);

  // Fetch goods orders data
  const fetchGoodsOrders = useCallback(async () => {
    setIsGoodsLoading(true);
    try {
      const res = await adminGetGoodsOrdersPage(
        {
          pageNum: goodsPage.pageNumber || 1,
          pageSize: goodsPage.pageSize || 10,
          ...(goodsFilter.search && { search: goodsFilter.search }),
          ...(goodsFilter.sort && { sort: goodsFilter.sort }),
          ...(goodsFilter.startDateTime && {
            startDateTime: goodsFilter.startDateTime,
          }),
          ...(goodsFilter.endDateTime && {
            endDateTime: goodsFilter.endDateTime,
          }),
        },
        {
          ...(goodsFilter.filter.status && {
            status: goodsFilter.filter.status,
          }),
        }
      );

      if (res.data) {
        const pageData = res.data as API.PageBaseGoodsOrdersVO;
        setGoodsPage({
          pageNumber: pageData.pageNumber || 1,
          pageSize: pageData.pageSize || 10,
          totalPage: pageData.totalPage,
          totalRow: pageData.totalRow,
        });

        // Map orders with users
        const ordersWithUser = (pageData.records || []).map((order) => {
          const user = users.find((u) => u.id === order.userId);
          return { ...order, user };
        });
        setGoodsOrdersWithUser(ordersWithUser);
      }
    } catch (error) {
      console.error("Failed to fetch goods orders:", error);
      toast.error("获取商品订单失败");
    } finally {
      setIsGoodsLoading(false);
    }
  }, [goodsFilter, goodsPage.pageNumber, goodsPage.pageSize, users]);

  // Load users on component mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Load orders when tab changes or dependencies change
  useEffect(() => {
    if (activeTab === "boat" && users.length > 0) {
      fetchBoatOrders();
    } else if (activeTab === "goods" && users.length > 0) {
      fetchGoodsOrders();
    }
  }, [activeTab, fetchBoatOrders, fetchGoodsOrders, users.length]);

  // Handle view detail
  const handleViewBoatOrderDetail = useCallback((order: BoatOrderWithUser) => {
    setSelectedBoatOrder(order);
    setIsBoatDetailDialogOpen(true);
  }, []);

  const handleViewGoodsOrderDetail = useCallback(
    (order: GoodsOrderWithUser) => {
      setSelectedGoodsOrder(order);
      setIsGoodsDetailDialogOpen(true);
    },
    []
  );

  // Boat orders table columns definition
  const boatOrderColumns: ColumnDef<BoatOrderWithUser>[] = [
    {
      id: "id",
      header: "订单ID",
      accessorKey: "id",
      enableSorting: true,
    },
    {
      id: "user",
      header: "用户",
      accessorFn: (row) => row.user?.username,
      cell: ({ row }) => row.original.user?.username || "-",
      enableSorting: true,
    },
    {
      id: "status",
      header: "状态",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = ORDER_STATUS[row.original.status as OrderStatus];
        return status ? (
          <Badge className={status.color}>{status.label}</Badge>
        ) : (
          "-"
        );
      },
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
      cell: ({ row }) => `¥${row.original.price?.toFixed(2) || "0.00"}`,
      enableSorting: true,
    },
    {
      id: "discount",
      header: "折扣",
      accessorKey: "discount",
      cell: ({ row }) => `¥${row.original.discount?.toFixed(2) || "0.00"}`,
      enableSorting: true,
    },
    {
      id: "createdAt",
      header: "创建时间",
      cell: ({ row }) =>
        row.original.createdAt
          ? formatDate(row.original.createdAt, "yyyy-MM-dd HH:mm:ss")
          : "-",
      enableSorting: true,
    },
  ];

  // Goods orders table columns definition
  const goodsOrderColumns: ColumnDef<GoodsOrderWithUser>[] = [
    {
      id: "id",
      header: "订单ID",
      accessorKey: "id",
      enableSorting: true,
    },
    {
      id: "user",
      header: "用户",
      accessorFn: (row) => row.user?.username,
      cell: ({ row }) => row.original.user?.username || "-",
      enableSorting: true,
    },
    {
      id: "status",
      header: "状态",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = ORDER_STATUS[row.original.status as OrderStatus];
        return status ? (
          <Badge className={status.color}>{status.label}</Badge>
        ) : (
          "-"
        );
      },
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
      cell: ({ row }) => `¥${row.original.price?.toFixed(2) || "0.00"}`,
      enableSorting: true,
    },
    {
      id: "discount",
      header: "折扣",
      accessorKey: "discount",
      cell: ({ row }) => `¥${row.original.discount?.toFixed(2) || "0.00"}`,
      enableSorting: true,
    },
    {
      id: "createdAt",
      header: "创建时间",
      cell: ({ row }) =>
        row.original.createdAt
          ? formatDate(row.original.createdAt, "yyyy-MM-dd HH:mm:ss")
          : "-",
      enableSorting: true,
    },
  ];

  // Table row actions
  const boatOrderActions = [
    {
      label: "查看详情",
      icon: <Eye className="mr-2 h-4 w-4" />,
      onClick: handleViewBoatOrderDetail,
    },
  ];

  const goodsOrderActions = [
    {
      label: "查看详情",
      icon: <Eye className="mr-2 h-4 w-4" />,
      onClick: handleViewGoodsOrderDetail,
    },
  ];

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">订单管理</h1>
            <p className="text-muted-foreground">管理所有船舶订单和商品订单</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="boat" className="flex items-center gap-2">
              <Ship className="w-4 h-4" />
              船舶订单
            </TabsTrigger>
            <TabsTrigger value="goods" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              商品订单
            </TabsTrigger>
          </TabsList>

          <TabsContent value="boat">
            <DataTable<BoatOrderWithUser>
              title="船舶订单"
              description="管理船舶租赁订单"
              loading={isBoatLoading}
              columns={boatOrderColumns}
              actions={boatOrderActions}
              data={boatOrdersWithUser}
              page={boatPage}
              onPageChange={(pageNumber) => {
                setBoatPage({ ...boatPage, pageNumber });
              }}
              filter={boatFilter}
              onFilterChange={(newFilter) => {
                setBoatFilter(newFilter);
                setBoatPage({ ...boatPage, pageNumber: 1 });
              }}
            />
          </TabsContent>

          <TabsContent value="goods">
            <DataTable<GoodsOrderWithUser>
              title="商品订单"
              description="管理商品购买订单"
              loading={isGoodsLoading}
              columns={goodsOrderColumns}
              actions={goodsOrderActions}
              data={goodsOrdersWithUser}
              page={goodsPage}
              onPageChange={(pageNumber) => {
                setGoodsPage({ ...goodsPage, pageNumber });
              }}
              filter={goodsFilter}
              onFilterChange={(newFilter) => {
                setGoodsFilter(newFilter);
                setGoodsPage({ ...goodsPage, pageNumber: 1 });
              }}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* 船舶订单详情对话框 */}
      <Dialog
        open={isBoatDetailDialogOpen}
        onOpenChange={setIsBoatDetailDialogOpen}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>船舶订单详情</DialogTitle>
            <DialogDescription>查看船舶订单详细信息</DialogDescription>
          </DialogHeader>
          {selectedBoatOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">订单ID</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedBoatOrder.id}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">用户</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedBoatOrder.user?.username || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">状态</label>
                  <div className="mt-1">
                    <Badge
                      className={
                        ORDER_STATUS[selectedBoatOrder.status as OrderStatus]
                          ?.color || ""
                      }
                    >
                      {ORDER_STATUS[selectedBoatOrder.status as OrderStatus]
                        ?.label || "未知"}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">船只ID</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedBoatOrder.boatId || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">价格</label>
                  <p className="text-sm text-muted-foreground">
                    ¥{selectedBoatOrder.price?.toFixed(2) || "0.00"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">折扣</label>
                  <p className="text-sm text-muted-foreground">
                    ¥{selectedBoatOrder.discount?.toFixed(2) || "0.00"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">创建时间</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedBoatOrder.createdAt
                      ? new Date(selectedBoatOrder.createdAt).toLocaleString()
                      : "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">更新时间</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedBoatOrder.updatedAt
                      ? new Date(selectedBoatOrder.updatedAt).toLocaleString()
                      : "-"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 商品订单详情对话框 */}
      <Dialog
        open={isGoodsDetailDialogOpen}
        onOpenChange={setIsGoodsDetailDialogOpen}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>商品订单详情</DialogTitle>
            <DialogDescription>查看商品订单详细信息</DialogDescription>
          </DialogHeader>
          {selectedGoodsOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">订单ID</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedGoodsOrder.id}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">用户</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedGoodsOrder.user?.username || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">状态</label>
                  <div className="mt-1">
                    <Badge
                      className={
                        ORDER_STATUS[selectedGoodsOrder.status as OrderStatus]
                          ?.color || ""
                      }
                    >
                      {ORDER_STATUS[selectedGoodsOrder.status as OrderStatus]
                        ?.label || "未知"}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">商家ID</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedGoodsOrder.merchantId || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">价格</label>
                  <p className="text-sm text-muted-foreground">
                    ¥{selectedGoodsOrder.price?.toFixed(2) || "0.00"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">折扣</label>
                  <p className="text-sm text-muted-foreground">
                    ¥{selectedGoodsOrder.discount?.toFixed(2) || "0.00"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">创建时间</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedGoodsOrder.createdAt
                      ? new Date(selectedGoodsOrder.createdAt).toLocaleString()
                      : "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">更新时间</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedGoodsOrder.updatedAt
                      ? new Date(selectedGoodsOrder.updatedAt).toLocaleString()
                      : "-"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
