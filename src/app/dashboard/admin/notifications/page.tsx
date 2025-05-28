import React, { useState } from "react";
import { Bell, Edit, Plus, Send, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {
  createNotification,
  deleteNotification,
  getNotificationsPage1,
  sendNotification,
  updateNotification,
} from "@/services/api/adminNotificationController";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";



const notificationSchema = z.object({
  userId: z.number().min(1, "用户ID不能为空"),
  title: z.string().min(1, "标题不能为空"),
  content: z.string().min(1, "内容不能为空"),
  type: z.string().min(1, "类型不能为空"),
  businessType: z.string().optional(),
  businessId: z.number().optional(),
});

type NotificationFormData = z.infer<typeof notificationSchema>;

const columns: Column<API.BaseNotificationsVO>[] = [
  {
    accessor: "id",
    header: "ID",
  },
  {
    accessor: "userId",
    header: "用户ID",
  },
  {
    accessor: "title",
    header: "标题",
  },
  {
    accessor: "content",
    header: "内容",
    render: (content) => (
      <div className="max-w-xs truncate" title={content}>
        {content}
      </div>
    ),
  },
  {
    accessor: "type",
    header: "类型",
  },
  {
    accessor: "isRead",
    header: "已读状态",
    render: (isRead) => (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          isRead
            ? "bg-green-100 text-green-800"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {isRead ? "已读" : "未读"}
      </span>
    ),
  },
  {
    accessor: "createdAt",
    header: "创建时间",
    render: (date) => (date ? new Date(date).toLocaleString() : "-"),
  },
];

function NotificationDialog({
  notification,
  onSuccess,
  trigger,
}: {
  notification?: API.BaseNotificationsVO;
  onSuccess: () => void;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<NotificationFormData>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      userId: notification?.userId || 0,
      title: notification?.title || "",
      content: notification?.content || "",
      type: notification?.type || "",
      businessType: notification?.businessType || "",
      businessId: notification?.businessId || 0,
    },
  });

  const onSubmit = async (data: NotificationFormData) => {
    setLoading(true);
    try {
      if (notification?.id) {
        await updateNotification({ id: notification.id }, data);
        toast.success("通知更新成功");
      } else {
        await createNotification(data);
        toast.success("通知创建成功");
      }
      setOpen(false);
      onSuccess();
      form.reset();
    } catch (error) {
      toast.error(notification?.id ? "通知更新失败" : "通知创建失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {notification?.id ? "编辑通知" : "创建通知"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>用户ID</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="请输入用户ID"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>标题</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入通知标题" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>内容</FormLabel>
                  <FormControl>
                    <Textarea placeholder="请输入通知内容" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>类型</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="选择通知类型" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="SYSTEM">系统通知</SelectItem>
                      <SelectItem value="ORDER">订单通知</SelectItem>
                      <SelectItem value="PAYMENT">支付通知</SelectItem>
                      <SelectItem value="AUDIT">审核通知</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="businessType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>业务类型（可选）</FormLabel>
                  <FormControl>
                    <Input placeholder="如: ORDER, USER" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="businessId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>业务ID（可选）</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="相关业务的ID"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number(e.target.value) || undefined)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                取消
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "保存中..." : "保存"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function SendNotificationDialog({
  onSuccess,
  trigger,
}: {
  onSuccess: () => void;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<{
    userId: number;
    title: string;
    content: string;
    type: string;
    businessType?: string;
    businessId?: number;
  }>({
    defaultValues: {
      userId: 0,
      title: "",
      content: "",
      type: "",
      businessType: "",
      businessId: 0,
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await sendNotification(data);
      toast.success("通知发送成功");
      setOpen(false);
      onSuccess();
      form.reset();
    } catch (error) {
      toast.error("通知发送失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>发送通知</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>用户ID</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="请输入用户ID"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>标题</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入通知标题" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>内容</FormLabel>
                  <FormControl>
                    <Textarea placeholder="请输入通知内容" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>类型</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="选择通知类型" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="SYSTEM">系统通知</SelectItem>
                      <SelectItem value="ORDER">订单通知</SelectItem>
                      <SelectItem value="PAYMENT">支付通知</SelectItem>
                      <SelectItem value="AUDIT">审核通知</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                取消
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "发送中..." : "发送"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default function NotificationsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleDelete = async (id: number) => {
    if (!confirm("确定要删除这个通知吗？")) return;

    try {
      await deleteNotification({ id });
      toast.success("通知删除成功");
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      toast.error("通知删除失败");
    }
  };

  const handleSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const actionColumn: Column<API.BaseNotificationsVO> = {
    accessor: "id.",
    header: "操作",
    render: (_: any, row?: TableRow<API.BaseNotificationsVO>) => {
      if (!row) return null;
      const notification = row.data;

      return (
        <div className="flex justify-end space-x-2">
          <NotificationDialog
            notification={notification}
            onSuccess={handleSuccess}
            trigger={
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            }
          />
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDelete(notification.id!)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bell className="h-6 w-6" />
          <h1 className="text-2xl font-semibold">通知管理</h1>
        </div>
        <div className="flex space-x-2">
          <SendNotificationDialog
            onSuccess={handleSuccess}
            trigger={
              <Button variant="outline">
                <Send className="h-4 w-4 mr-2" />
                发送通知
              </Button>
            }
          />
          <NotificationDialog
            onSuccess={handleSuccess}
            trigger={
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                创建通知
              </Button>
            }
          />
        </div>
      </div>

      <DataManagementTable
        key={refreshKey}
        title=""
        icon={<></>}
        columns={[...columns, actionColumn]}
        isLoading={isLoading}
        searchPlaceholder="搜索通知..."
        queryFn={async ({ pageNum, pageSize }) => {
          const response = await getNotificationsPage1(
            { pageNum, pageSize },
            {}
          );
          const pageData = response.data as API.PageBaseNotificationsVO;
          return {
            list: pageData?.records || [],
            totalItems: pageData?.totalRow || 0,
            totalPages: pageData?.totalPage || 0,
          };
        }}
        pagination={{
          currentPage,
          totalPages: 1,
          totalItems: 0,
          onPageChange: setCurrentPage,
        }}
      />
    </div>
  );
}
