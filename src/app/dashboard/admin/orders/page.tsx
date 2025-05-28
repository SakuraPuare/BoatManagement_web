import React, { useCallback, useEffect, useState } from "react";

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



const ITEMS_PER_PAGE = 10;

type OrderStatus = keyof typeof ORDER_STATUS;

type BoatOrderWithUser = API.BaseBoatOrdersVO & {
  user?: API.BaseAccountsVO;
};

type GoodsOrderWithUser = API.BaseGoodsOrdersVO & {
  user?: API.BaseAccountsVO;
};

export default function AdminOrdersPage() {
  const [boatOrders, setBoatOrders] = useState<API.BaseBoatOrdersVO[]>([]);
  const [goodsOrders, setGoodsOrders] = useState<API.BaseGoodsOrdersVO[]>([]);
  const [boatOrdersWithUser, setBoatOrdersWithUser] = useState<
    BoatOrderWithUser[]
  >([]);
  const [goodsOrdersWithUser, setGoodsOrdersWithUser] = useState<
    GoodsOrderWithUser[]
  >([]);
  const [users, setUsers] = useState<API.BaseAccountsVO[]>([]);
  const [selectedBoatOrder, setSelectedBoatOrder] =
    useState<BoatOrderWithUser | null>(null);
  const [selectedGoodsOrder, setSelectedGoodsOrder] =
    useState<GoodsOrderWithUser | null>(null);

  const [boatCurrentPage, setBoatCurrentPage] = useState(1);
  const [goodsCurrentPage, setGoodsCurrentPage] = useState(1);
  const [boatTotalPages, setBoatTotalPages] = useState(0);
  const [goodsTotalPages, setGoodsTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isBoatDetailDialogOpen, setIsBoatDetailDialogOpen] = useState(false);
  const [isGoodsDetailDialogOpen, setIsGoodsDetailDialogOpen] = useState(false);
  const [boatStatusFilter, setBoatStatusFilter] = useState<"all" | OrderStatus>(
    "all"
  );
  const [goodsStatusFilter, setGoodsStatusFilter] = useState<
    "all" | OrderStatus
  >("all");
  const [activeTab, setActiveTab] = useState("boat");

  const fetchUsers = useCallback(async () => {
    try {
      const response = await adminGetUserList({}, {});
      setUsers((response.data as API.BaseAccountsVO[]) || []);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchBoatOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await adminGetBoatOrdersPage(
        { pageNum: boatCurrentPage, pageSize: ITEMS_PER_PAGE },
        {
          ...(boatStatusFilter !== "all" && { status: boatStatusFilter }),
        }
      );
      if (response.data) {
        const pageData = response.data as API.PageBaseBoatOrdersVO;
        setBoatOrders(pageData.records || []);
        setBoatTotalPages(pageData.totalPage || 0);
      }
    } catch (error) {
      console.error(error);
      toast.error("获取船舶订单失败");
    } finally {
      setIsLoading(false);
    }
  }, [boatCurrentPage, boatStatusFilter]);

  const fetchGoodsOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await adminGetGoodsOrdersPage(
        { pageNum: goodsCurrentPage, pageSize: ITEMS_PER_PAGE },
        {
          ...(goodsStatusFilter !== "all" && { status: goodsStatusFilter }),
        }
      );
      if (response.data) {
        const pageData = response.data as API.PageBaseGoodsOrdersVO;
        setGoodsOrders(pageData.records || []);
        setGoodsTotalPages(pageData.totalPage || 0);
      }
    } catch (error) {
      console.error(error);
      toast.error("获取商品订单失败");
    } finally {
      setIsLoading(false);
    }
  }, [goodsCurrentPage, goodsStatusFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    if (activeTab === "boat") {
      fetchBoatOrders();
    } else {
      fetchGoodsOrders();
    }
  }, [activeTab, fetchBoatOrders, fetchGoodsOrders]);

  useEffect(() => {
    if (users.length > 0) {
      const boatOrdersWithUser = boatOrders.map((order) => {
        const user = users.find((u) => u.id === order.userId);
        return { ...order, user };
      });
      setBoatOrdersWithUser(boatOrdersWithUser);

      const goodsOrdersWithUser = goodsOrders.map((order) => {
        const user = users.find((u) => u.id === order.userId);
        return { ...order, user };
      });
      setGoodsOrdersWithUser(goodsOrdersWithUser);
    }
  }, [boatOrders, goodsOrders, users]);

  const handleViewBoatOrderDetail = (order: BoatOrderWithUser) => {
    setSelectedBoatOrder(order);
    setIsBoatDetailDialogOpen(true);
  };

  const handleViewGoodsOrderDetail = (order: GoodsOrderWithUser) => {
    setSelectedGoodsOrder(order);
    setIsGoodsDetailDialogOpen(true);
  };

  const boatOrderColumns: Column<BoatOrderWithUser>[] = [
    {
      key: "id",
      title: "订单ID",
      width: "100px",
    },
    {
      key: "user",
      title: "用户",
      width: "120px",
      render: (user: API.BaseAccountsVO) => user?.username || "-",
    },
    {
      key: "status",
      title: "状态",
      width: "100px",
      render: (value: OrderStatus) => {
        const status = ORDER_STATUS[value];
        return status ? (
          <Badge className={status.color}>{status.label}</Badge>
        ) : (
          "-"
        );
      },
    },
    {
      key: "price",
      title: "价格",
      width: "100px",
      render: (value: number) => `¥${value?.toFixed(2) || "0.00"}`,
    },
    {
      key: "discount",
      title: "折扣",
      width: "100px",
      render: (value: number) => `¥${value?.toFixed(2) || "0.00"}`,
    },
    {
      key: "createdAt",
      title: "创建时间",
      width: "160px",
      render: (value: string) => {
        return value ? new Date(value).toLocaleString() : "-";
      },
    },
  ];

  const goodsOrderColumns: Column<GoodsOrderWithUser>[] = [
    {
      key: "id",
      title: "订单ID",
      width: "100px",
    },
    {
      key: "user",
      title: "用户",
      width: "120px",
      render: (user: API.BaseAccountsVO) => user?.username || "-",
    },
    {
      key: "status",
      title: "状态",
      width: "100px",
      render: (value: OrderStatus) => {
        const status = ORDER_STATUS[value];
        return status ? (
          <Badge className={status.color}>{status.label}</Badge>
        ) : (
          "-"
        );
      },
    },
    {
      key: "price",
      title: "价格",
      width: "100px",
      render: (value: number) => `¥${value?.toFixed(2) || "0.00"}`,
    },
    {
      key: "discount",
      title: "折扣",
      width: "100px",
      render: (value: number) => `¥${value?.toFixed(2) || "0.00"}`,
    },
    {
      key: "createdAt",
      title: "创建时间",
      width: "160px",
      render: (value: string) => {
        return value ? new Date(value).toLocaleString() : "-";
      },
    },
  ];

  const boatOrderActions: Action<BoatOrderWithUser>[] = [
    {
      label: "查看详情",
      icon: <Eye className="w-4 h-4" />,
      onClick: handleViewBoatOrderDetail,
    },
  ];

  const goodsOrderActions: Action<GoodsOrderWithUser>[] = [
    {
      label: "查看详情",
      icon: <Eye className="w-4 h-4" />,
      onClick: handleViewGoodsOrderDetail,
    },
  ];

  const boatOrderFilters = [
    {
      key: "status",
      label: "状态",
      value: boatStatusFilter,
      onChange: (value: string) =>
        setBoatStatusFilter(value as "all" | OrderStatus),
      options: [
        { label: "全部", value: "all" },
        ...Object.entries(ORDER_STATUS).map(([key, value]) => ({
          label: value.label,
          value: key,
        })),
      ],
    },
  ];

  const goodsOrderFilters = [
    {
      key: "status",
      label: "状态",
      value: goodsStatusFilter,
      onChange: (value: string) =>
        setGoodsStatusFilter(value as "all" | OrderStatus),
      options: [
        { label: "全部", value: "all" },
        ...Object.entries(ORDER_STATUS).map(([key, value]) => ({
          label: value.label,
          value: key,
        })),
      ],
    },
  ];

  return (
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
          <DataManagementTable
            title="船舶订单"
            icon={<Ship className="w-5 h-5" />}
            data={boatOrdersWithUser}
            columns={boatOrderColumns as any}
            actions={boatOrderActions as any}
            statusFilter={boatOrderFilters[0]}
            pagination={{
              currentPage: boatCurrentPage,
              totalPages: boatTotalPages,
              totalItems: boatTotalPages * ITEMS_PER_PAGE,
              onPageChange: setBoatCurrentPage,
            }}
            isLoading={isLoading}
            searchPlaceholder="搜索订单ID或用户名..."
          />
        </TabsContent>

        <TabsContent value="goods">
          <DataManagementTable
            title="商品订单"
            icon={<Package className="w-5 h-5" />}
            data={goodsOrdersWithUser}
            columns={goodsOrderColumns as any}
            actions={goodsOrderActions as any}
            statusFilter={goodsOrderFilters[0]}
            pagination={{
              currentPage: goodsCurrentPage,
              totalPages: goodsTotalPages,
              totalItems: goodsTotalPages * ITEMS_PER_PAGE,
              onPageChange: setGoodsCurrentPage,
            }}
            isLoading={isLoading}
            searchPlaceholder="搜索订单ID或用户名..."
          />
        </TabsContent>
      </Tabs>

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
              {selectedGoodsOrder.orderInfo && (
                <div>
                  <label className="text-sm font-medium">订单信息</label>
                  <pre className="text-sm text-muted-foreground bg-muted p-2 rounded mt-1 overflow-auto">
                    {JSON.stringify(selectedGoodsOrder.orderInfo, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
