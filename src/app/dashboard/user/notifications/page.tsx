import React, { useCallback, useEffect, useState } from "react";
import {
  type Action,
  type Column,
  DataManagementTable,
} from "@/components/data-management-table";
import {
  getNotificationsPage,
  getUnreadCount,
  markAsRead,
  markMultipleAsRead,
} from "@/services/api/userNotificationController";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

("use client");

const ITEMS_PER_PAGE = 10;

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
  const [notifications, setNotifications] = useState<API.BaseNotificationsVO[]>(
    []
  );
  const [selectedNotification, setSelectedNotification] =
    useState<API.BaseNotificationsVO | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [readFilter, setReadFilter] = useState<"all" | "read" | "unread">(
    "all"
  );
  const [typeFilter, setTypeFilter] = useState<"all" | NotificationType>("all");
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getNotificationsPage(
        {
          userId: CURRENT_USER_ID,
          pageNum: currentPage,
          pageSize: ITEMS_PER_PAGE,
        },
        {
          userId: CURRENT_USER_ID,
          ...(readFilter === "read" && { isRead: true }),
          ...(readFilter === "unread" && { isRead: false }),
          ...(typeFilter !== "all" && { type: typeFilter }),
        }
      );
      if (response.data?.records) {
        setNotifications(response.data.records);
        setTotalPages(response.data.totalPage || 0);
      }
    } catch (error) {
      console.error(error);
      toast.error("获取通知列表失败");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, readFilter, typeFilter]);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const response = await getUnreadCount({ userId: CURRENT_USER_ID });
      setUnreadCount(response.data || 0);
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

  const columns: Column<API.BaseNotificationsVO>[] = [
    {
      accessor: "isRead",
      header: "状态",
      render: (value: boolean) => (
        <div className="flex items-center justify-center">
          {value ? (
            <BellOff className="w-4 h-4 text-muted-foreground" />
          ) : (
            <Bell className="w-4 h-4 text-blue-500" />
          )}
        </div>
      ),
    },
    {
      accessor: "type",
      header: "类型",
      render: (value: NotificationType) => {
        const type =
          NOTIFICATION_TYPE_MAP[value] || NOTIFICATION_TYPE_MAP.SYSTEM;
        return <Badge variant={type.variant}>{type.label}</Badge>;
      },
    },
    {
      accessor: "title",
      header: "标题",
      render: (value: string, row?: any) => (
        <div
          className={`${row?.data && !row.data.isRead ? "font-semibold" : ""}`}
        >
          {value || "-"}
        </div>
      ),
    },
    {
      accessor: "content",
      header: "内容",
      render: (value: string, row?: any) => (
        <div
          className={`truncate ${
            row?.data && !row.data.isRead ? "font-medium" : ""
          }`}
        >
          {value || "-"}
        </div>
      ),
    },
    {
      accessor: "createdAt",
      header: "时间",
      render: (value: string) => {
        return value ? new Date(value).toLocaleString() : "-";
      },
    },
  ];

  const actions: Action<API.BaseNotificationsVO>[] = [
    {
      label: "查看详情",
      icon: <Eye className="w-4 h-4" />,
      onClick: handleViewDetail,
    },
    {
      label: "标记已读",
      icon: <Check className="w-4 h-4" />,
      onClick: (item) => handleMarkAsRead(item.id!),
      show: (item) => !item.isRead,
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

      {/* 筛选器 */}
      <div className="flex items-center space-x-4">
        <Select
          value={readFilter}
          onValueChange={(value) =>
            setReadFilter(value as "all" | "read" | "unread")
          }
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="阅读状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value="read">已读</SelectItem>
            <SelectItem value="unread">未读</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={typeFilter}
          onValueChange={(value) =>
            setTypeFilter(value as "all" | NotificationType)
          }
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="通知类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            {Object.entries(NOTIFICATION_TYPE_MAP).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                {value.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DataManagementTable<API.BaseNotificationsVO>
        title="通知列表"
        icon={<Bell className="w-5 h-5" />}
        data={notifications}
        columns={columns}
        actions={actions}
        isLoading={isLoading}
        searchPlaceholder="搜索通知标题或内容..."
        pagination={{
          currentPage,
          totalPages,
          totalItems: totalPages * ITEMS_PER_PAGE,
          onPageChange: setCurrentPage,
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
