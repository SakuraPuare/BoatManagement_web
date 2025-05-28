"use client";

import React, { useCallback, useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import { DialogForm, FieldConfig } from "@/components/data-form";
import { Filter, Page } from "@/components/data-table/types";
import { Edit, Plus, Send, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  createNotification,
  deleteNotification,
  getNotificationsPage1,
  sendNotification,
  updateNotification,
} from "@/services/api/adminNotificationController";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";

const notificationSchema = z.object({
  userId: z.number().min(1, "用户ID不能为空"),
  title: z.string().min(1, "标题不能为空"),
  content: z.string().min(1, "内容不能为空"),
  type: z.string().min(1, "类型不能为空"),
  businessType: z.string().optional(),
  businessId: z.number().optional(),
});

const sendNotificationSchema = z.object({
  userId: z.number().min(1, "用户ID不能为空"),
  title: z.string().min(1, "标题不能为空"),
  content: z.string().min(1, "内容不能为空"),
  type: z.string().min(1, "类型不能为空"),
  businessType: z.string().optional(),
  businessId: z.number().optional(),
});

type NotificationFormData = z.infer<typeof notificationSchema>;
type SendNotificationFormData = z.infer<typeof sendNotificationSchema>;

// 默认表单值
const defaultNotificationValues: Partial<NotificationFormData> = {
  userId: 0,
  title: "",
  content: "",
  type: "SYSTEM",
  businessType: "",
  businessId: 0,
};

// 表单字段配置
const notificationFieldConfigs: Record<
  keyof NotificationFormData,
  FieldConfig
> = {
  userId: {
    type: "number",
    label: "用户ID",
    placeholder: "请输入用户ID",
  },
  title: {
    type: "input",
    label: "标题",
    placeholder: "请输入通知标题",
  },
  content: {
    type: "textarea",
    label: "内容",
    placeholder: "请输入通知内容",
  },
  type: {
    type: "select",
    label: "类型",
    placeholder: "选择通知类型",
    options: [
      { value: "SYSTEM", label: "系统通知" },
      { value: "ORDER", label: "订单通知" },
      { value: "PAYMENT", label: "支付通知" },
      { value: "AUDIT", label: "审核通知" },
    ],
  },
  businessType: {
    type: "input",
    label: "业务类型",
    placeholder: "请输入业务类型(可选)",
  },
  businessId: {
    type: "number",
    label: "业务ID",
    placeholder: "请输入业务ID(可选)",
  },
};

const sendNotificationFieldConfigs: Record<
  keyof SendNotificationFormData,
  FieldConfig
> = {
  ...notificationFieldConfigs,
};

interface NotificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  notification?: API.BaseNotificationsVO | null;
}

function NotificationDialog({
  open,
  onOpenChange,
  onSuccess,
  notification,
}: NotificationDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!notification;

  // 创建表单方法
  const formMethods = useForm<NotificationFormData>({
    resolver: zodResolver(notificationSchema),
    defaultValues: isEditing
      ? {
          userId: notification?.userId || 0,
          title: notification?.title || "",
          content: notification?.content || "",
          type: notification?.type || "SYSTEM",
          businessType: notification?.businessType || "",
          businessId: notification?.businessId || 0,
        }
      : defaultNotificationValues,
  });

  // 监听 notification 变化，更新表单默认值
  useEffect(() => {
    if (open) {
      if (isEditing && notification) {
        formMethods.reset({
          userId: notification.userId || 0,
          title: notification.title || "",
          content: notification.content || "",
          type: notification.type || "SYSTEM",
          businessType: notification.businessType || "",
          businessId: notification.businessId || 0,
        });
      } else {
        formMethods.reset(defaultNotificationValues);
      }
    }
  }, [notification, open, isEditing, formMethods]);

  // 处理表单提交
  const handleSubmit = async (data: NotificationFormData) => {
    setIsLoading(true);
    try {
      if (isEditing && notification?.id) {
        await updateNotification({ id: notification.id }, data);
        toast.success("通知更新成功");
      } else {
        await createNotification(data);
        toast.success("通知创建成功");
      }

      formMethods.reset(defaultNotificationValues);
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      console.error("Failed to save notification:", error);
      toast.error(isEditing ? "更新通知失败" : "创建通知失败");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogForm
      title={isEditing ? "编辑通知" : "创建通知"}
      description={isEditing ? "修改通知信息" : "请填写通知信息"}
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) {
          formMethods.reset(defaultNotificationValues);
        }
      }}
      onSubmit={handleSubmit}
      formSchema={notificationSchema}
      defaultValues={
        isEditing
          ? {
              userId: notification?.userId || 0,
              title: notification?.title || "",
              content: notification?.content || "",
              type: notification?.type || "SYSTEM",
              businessType: notification?.businessType || "",
              businessId: notification?.businessId || 0,
            }
          : defaultNotificationValues
      }
      fieldConfigs={notificationFieldConfigs}
      formMethods={formMethods}
      submitButtonText={isLoading ? "保存中..." : isEditing ? "更新" : "创建"}
      cancelButtonText="取消"
      showCancelButton={true}
      fieldOrder={[
        "userId",
        "title",
        "content",
        "type",
        "businessType",
        "businessId",
      ]}
      key={notification?.id ?? "new"}
    />
  );
}

interface SendNotificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

function SendNotificationDialog({
  open,
  onOpenChange,
  onSuccess,
}: SendNotificationDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  // 创建表单方法
  const formMethods = useForm<SendNotificationFormData>({
    resolver: zodResolver(sendNotificationSchema),
    defaultValues: {
      userId: 0,
      title: "",
      content: "",
      type: "SYSTEM",
      businessType: "",
      businessId: 0,
    },
  });

  // 处理表单提交
  const handleSubmit = async (data: SendNotificationFormData) => {
    setIsLoading(true);
    try {
      await sendNotification({
        userId: data.userId,
        title: data.title,
        content: data.content,
        type: data.type,
        businessType: data.businessType,
        businessId: data.businessId,
      });
      toast.success("通知发送成功");
      formMethods.reset();
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      console.error("Failed to send notification:", error);
      toast.error("发送通知失败");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogForm
      title="发送通知"
      description="发送实时通知给指定用户"
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) {
          formMethods.reset();
        }
      }}
      onSubmit={handleSubmit}
      formSchema={sendNotificationSchema}
      defaultValues={{
        userId: 0,
        title: "",
        content: "",
        type: "SYSTEM",
        businessType: "",
        businessId: 0,
      }}
      fieldConfigs={sendNotificationFieldConfigs}
      formMethods={formMethods}
      submitButtonText={isLoading ? "发送中..." : "发送"}
      cancelButtonText="取消"
      showCancelButton={true}
      fieldOrder={[
        "userId",
        "title",
        "content",
        "type",
        "businessType",
        "businessId",
      ]}
    />
  );
}

export default function NotificationsPage() {
  // State for data table
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<Page>({
    pageNumber: 1,
    pageSize: 10,
  });
  const [filter, setFilter] = useState<Filter<API.BaseNotificationsVO>>({
    filter: {},
    filterOptions: [],
    search: null,
    sort: null,
    startDateTime: null,
    endDateTime: null,
  });
  const [notifications, setNotifications] = useState<API.BaseNotificationsVO[]>(
    []
  );

  // State for dialogs
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingNotification, setEditingNotification] =
    useState<API.BaseNotificationsVO | null>(null);

  // State for delete confirmation
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  // Fetch notifications data
  const fetchNotifications = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getNotificationsPage1(
        {
          pageNum: page.pageNumber || 1,
          pageSize: page.pageSize || 10,
          ...(filter.search && { search: filter.search }),
          ...(filter.sort && { sort: filter.sort }),
          ...(filter.startDateTime && { startDateTime: filter.startDateTime }),
          ...(filter.endDateTime && { endDateTime: filter.endDateTime }),
        },
        filter.filter
      );

      const pageData = res.data as any;
      setPage({
        pageNumber: pageData?.pageNumber || 1,
        pageSize: pageData?.pageSize || 10,
        totalPage: pageData?.totalPage,
        totalRow: pageData?.totalRow,
      });

      setNotifications(pageData?.records || []);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      toast.error("获取通知列表失败");
    } finally {
      setIsLoading(false);
    }
  }, [filter, page.pageNumber, page.pageSize]);

  // Load data on component mount and when dependencies change
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleSuccess = () => {
    fetchNotifications();
  };

  const handleDelete = useCallback(
    async (notification: API.BaseNotificationsVO) => {
      if (!notification?.id) return;

      setIsDeleting(notification.id);
      try {
        await deleteNotification({ id: notification.id });
        toast.success(`通知删除成功`);
        fetchNotifications();
      } catch (error) {
        console.error("Failed to delete notification:", error);
        toast.error(`删除通知失败`);
      } finally {
        setIsDeleting(null);
      }
    },
    [fetchNotifications]
  );

  const handleOpenEditDialog = useCallback(
    (notification: API.BaseNotificationsVO) => {
      setEditingNotification(notification);
      setIsEditDialogOpen(true);
    },
    []
  );

  // Table columns definition
  const columns: ColumnDef<API.BaseNotificationsVO>[] = [
    {
      id: "id",
      header: "ID",
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
      id: "title",
      header: "标题",
      accessorKey: "title",
      cell: ({ row }) => (
        <div className="max-w-xs truncate" title={row.original.title}>
          {row.original.title}
        </div>
      ),
      enableSorting: true,
    },
    {
      id: "content",
      header: "内容",
      accessorKey: "content",
      cell: ({ row }) => (
        <div className="max-w-xs truncate" title={row.original.content}>
          {row.original.content}
        </div>
      ),
      enableSorting: false,
    },
    {
      id: "type",
      header: "类型",
      accessorKey: "type",
      enableSorting: true,
    },
    {
      id: "isRead",
      header: "已读状态",
      accessorKey: "isRead",
      cell: ({ row }) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            row.original.isRead
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.original.isRead ? "已读" : "未读"}
        </span>
      ),
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
  const actions = [
    {
      label: "编辑",
      icon: <Edit className="mr-2 h-4 w-4" />,
      onClick: handleOpenEditDialog,
      disabled: (row: API.BaseNotificationsVO) => isDeleting === row.id,
    },
    {
      label: "删除",
      icon: <Trash2 className="mr-2 h-4 w-4 text-red-500" />,
      onClick: handleDelete,
      className: "text-red-500",
      disabled: (row: API.BaseNotificationsVO) => !!isDeleting,
      loading: (row: API.BaseNotificationsVO) => isDeleting === row.id,
      loadingText: "删除中...",
    },
  ];

  // Table toolbar actions
  const toolbars = [
    {
      label: "发送通知",
      icon: <Send />,
      onClick: () => setIsSendDialogOpen(true),
    },
    {
      label: "创建通知",
      icon: <Plus />,
      onClick: () => setIsCreateDialogOpen(true),
    },
  ];

  return (
    <>
      {/* Create Dialog */}
      <NotificationDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={handleSuccess}
      />

      {/* Edit Dialog */}
      <NotificationDialog
        open={isEditDialogOpen}
        onOpenChange={(open) => {
          setIsEditDialogOpen(open);
          if (!open) {
            setEditingNotification(null);
          }
        }}
        onSuccess={handleSuccess}
        notification={editingNotification}
      />

      {/* Send Dialog */}
      <SendNotificationDialog
        open={isSendDialogOpen}
        onOpenChange={setIsSendDialogOpen}
        onSuccess={handleSuccess}
      />

      <DataTable<API.BaseNotificationsVO>
        title="通知管理"
        description="管理系统通知和消息"
        loading={isLoading}
        columns={columns}
        actions={actions}
        data={notifications}
        toolbars={toolbars}
        page={page}
        onPageChange={(pageNumber) => {
          setPage({ ...page, pageNumber });
        }}
        filter={filter}
        onFilterChange={(newFilter) => {
          setFilter(newFilter);
          setPage({ ...page, pageNumber: 1 }); // 筛选变化时重置页码
        }}
      />
    </>
  );
}
