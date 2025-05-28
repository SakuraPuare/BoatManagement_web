"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  getNotificationsPage,
  getUnreadCount,
  markAsRead,
  markMultipleAsRead,
} from "@/services/api/userNotificationController";
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Filter, Page } from "@/components/data-table/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, BellOff, Check, CheckCheck, Eye } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// 模拟当前用户ID，实际应该从认证状态获取
const CURRENT_USER_ID = 1;

type NotificationType = "SYSTEM" | "ORDER" | "BOAT" | "MERCHANT";

const NOTIFICATION_TYPE_MAP: Record<
  NotificationType,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  SYSTEM: { label: "系统通知", variant: "default" },
  ORDER: { label: "订单通知", variant: "secondary" },
  BOAT: { label: "船舶通知", variant: "outline" },
  MERCHANT: { label: "商家通知", variant: "destructive" },
};

export default function UserNotificationsPage() {
  // State for data table
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<Page>({
    pageNumber: 1,
    pageSize: 10,
  });
  const [filter, setFilter] = useState<Filter<API.BaseNotificationsVO>>({
    filter: {},
    filterOptions: [
      {
        id: "isRead",
        label: "阅读状态",
        options: [
          { value: "all", label: "全部" },
          { value: "true", label: "已读" },
          { value: "false", label: "未读" },
        ],
      },
      {
        id: "type",
        label: "通知类型",
        options: [
          { value: "all", label: "全部" },
          ...Object.entries(NOTIFICATION_TYPE_MAP).map(([key, value]) => ({
            value: key,
            label: value.label,
          })),
        ],
      },
    ],
    search: null,
    sort: null,
    startDateTime: null,
    endDateTime: null,
  });
  const [notifications, setNotifications] = useState<API.BaseNotificationsVO[]>(
    []
  );

  const [selectedNotification, setSelectedNotification] =
    useState<API.BaseNotificationsVO | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = useCallback(async () => {
    setIsLoading(true);
    try {
      const readValue = String(filter.filter.isRead || "");
      const typeValue = String(filter.filter.type || "");

      const response = await getNotificationsPage(
        {
          userId: CURRENT_USER_ID,
          pageNum: page.pageNumber || 1,
          pageSize: page.pageSize || 10,
          ...(filter.search && { search: filter.search }),
          ...(filter.sort && { sort: filter.sort }),
          ...(filter.startDateTime && { startDateTime: filter.startDateTime }),
          ...(filter.endDateTime && { endDateTime: filter.endDateTime }),
        },
        {
          userId: CURRENT_USER_ID,
          ...(readValue === "true" && { isRead: true }),
          ...(readValue === "false" && { isRead: false }),
          ...(typeValue && typeValue !== "all" && { type: typeValue }),
        }
      );

      if (response.data) {
        const pageData = response.data as API.PageBaseNotificationsVO;
        setPage({
          pageNumber: pageData.pageNumber || 1,
          pageSize: pageData.pageSize || 10,
          totalPage: pageData.totalPage,
          totalRow: pageData.totalRow,
        });

        setNotifications(pageData.records || []);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      toast.error("获取通知列表失败");
    } finally {
      setIsLoading(false);
    }
  }, [filter, page.pageNumber, page.pageSize]);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const response = await getUnreadCount({ userId: CURRENT_USER_ID });
      setUnreadCount(Number(response.data) || 0);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();
  }, [fetchNotifications, fetchUnreadCount]);

  const handleMarkAsRead = async (notificationId: number) => {
    try {
      await markAsRead({ userId: CURRENT_USER_ID, notificationId });
      toast.success("标记为已读");
      await fetchNotifications();
      await fetchUnreadCount();
    } catch (error) {
      console.error(error);
      toast.error("标记失败");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      // 获取所有未读通知的ID
      const unreadIds = notifications
        .filter((n) => !n.isRead)
        .map((n) => n.id!);
      if (unreadIds.length > 0) {
        await markMultipleAsRead({ userId: CURRENT_USER_ID }, unreadIds);
      }
      toast.success("全部标记为已读");
      await fetchNotifications();
      await fetchUnreadCount();
    } catch (error) {
      console.error(error);
      toast.error("标记失败");
    }
  };

  const handleViewDetail = (notification: API.BaseNotificationsVO) => {
    setSelectedNotification(notification);
    setIsDetailDialogOpen(true);

    // 如果是未读通知，自动标记为已读
    if (!notification.isRead) {
      handleMarkAsRead(notification.id!);
    }
  };

  // Table columns definition
  const columns: ColumnDef<API.BaseNotificationsVO>[] = [
    {
      id: "isRead",
      header: "状态",
      accessorKey: "isRead",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          {row.original.isRead ? (
            <BellOff className="w-4 h-4 text-muted-foreground" />
          ) : (
            <Bell className="w-4 h-4 text-blue-500" />
          )}
        </div>
      ),
      enableSorting: true,
    },
    {
      id: "type",
      header: "类型",
      accessorKey: "type",
      cell: ({ row }) => {
        const type =
          NOTIFICATION_TYPE_MAP[row.original.type as NotificationType] ||
          NOTIFICATION_TYPE_MAP.SYSTEM;
        return <Badge variant={type.variant}>{type.label}</Badge>;
      },
      enableSorting: true,
    },
    {
      id: "title",
      header: "标题",
      accessorKey: "title",
      cell: ({ row }) => (
        <div className={`${!row.original.isRead ? "font-semibold" : ""}`}>
          {row.original.title || "-"}
        </div>
      ),
      enableSorting: true,
    },
    {
      id: "content",
      header: "内容",
      accessorKey: "content",
      cell: ({ row }) => (
        <div
          className={`truncate ${!row.original.isRead ? "font-medium" : ""}`}
        >
          {row.original.content || "-"}
        </div>
      ),
      enableSorting: false,
    },
    {
      id: "createdAt",
      header: "时间",
      accessorKey: "createdAt",
      cell: ({ row }) =>
        row.original.createdAt
          ? new Date(row.original.createdAt).toLocaleString()
          : "-",
      enableSorting: true,
    },
  ];

  // Table row actions
  const actions = [
    {
      label: "查看详情",
      icon: <Eye className="w-4 h-4" />,
      onClick: handleViewDetail,
    },
    {
      label: "标记已读",
      icon: <Check className="w-4 h-4" />,
      onClick: (item: API.BaseNotificationsVO) => handleMarkAsRead(item.id!),
      // 只为未读通知显示此操作
      disabled: (row: API.BaseNotificationsVO) => row.isRead,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            通知中心
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </h1>
          <p className="text-muted-foreground">查看和管理您的通知消息</p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={handleMarkAllAsRead} variant="outline">
            <CheckCheck className="w-4 h-4 mr-2" />
            全部标记已读
          </Button>
        )}
      </div>

      <DataTable<API.BaseNotificationsVO>
        title="通知列表"
        description={
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            <span>查看和管理您的通知消息</span>
          </div>
        }
        loading={isLoading}
        columns={columns}
        actions={actions}
        data={notifications}
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

      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>通知详情</DialogTitle>
            <DialogDescription>查看通知详细信息</DialogDescription>
          </DialogHeader>
          {selectedNotification && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">类型</label>
                <div className="mt-1">
                  <Badge
                    variant={
                      NOTIFICATION_TYPE_MAP[
                        selectedNotification.type as NotificationType
                      ]?.variant || "outline"
                    }
                  >
                    {NOTIFICATION_TYPE_MAP[
                      selectedNotification.type as NotificationType
                    ]?.label || "未知"}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">标题</label>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedNotification.title || "-"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">内容</label>
                <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">
                  {selectedNotification.content || "-"}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">业务类型</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedNotification.businessType || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">业务ID</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedNotification.businessId || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">创建时间</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedNotification.createdAt
                      ? new Date(
                          selectedNotification.createdAt
                        ).toLocaleString()
                      : "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">阅读状态</label>
                  <div className="mt-1">
                    <Badge
                      variant={
                        selectedNotification.isRead ? "default" : "destructive"
                      }
                    >
                      {selectedNotification.isRead ? "已读" : "未读"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
