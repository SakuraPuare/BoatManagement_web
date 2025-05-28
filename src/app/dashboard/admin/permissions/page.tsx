import React, { useState } from "react";
import { Edit, Plus, Shield, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  type Column,
  DataManagementTable,
  type TableRow,
} from "@/components/data-management-table";
import {
  adminCreatePermission,
  adminDeletePermission,
  adminGetPermissionPage,
  adminUpdatePermission,
} from "@/services/api/adminPermission";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

("use client");

const permissionSchema = z.object({
  name: z.string().min(1, "权限名称不能为空"),
  code: z.string().min(1, "权限代码不能为空"),
  description: z.string().optional(),
});

type PermissionFormData = z.infer<typeof permissionSchema>;

const columns: Column<API.BasePermissionVO>[] = [
  {
    accessor: "id",
    header: "ID",
  },
  {
    accessor: "name",
    header: "权限名称",
  },
  {
    accessor: "code",
    header: "权限代码",
  },
  {
    accessor: "description",
    header: "描述",
  },
  {
    accessor: "createdAt",
    header: "创建时间",
    render: (date) => (date ? new Date(date).toLocaleString() : "-"),
  },
];

function PermissionDialog({
  permission,
  onSuccess,
  trigger,
}: {
  permission?: API.BasePermissionVO;
  onSuccess: () => void;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<PermissionFormData>({
    resolver: zodResolver(permissionSchema),
    defaultValues: {
      name: permission?.name || "",
      code: permission?.code || "",
      description: permission?.description || "",
    },
  });

  const onSubmit = async (data: PermissionFormData) => {
    setLoading(true);
    try {
      if (permission?.id) {
        await adminUpdatePermission({ id: permission.id }, data);
        toast.success("权限更新成功");
      } else {
        await adminCreatePermission(data);
        toast.success("权限创建成功");
      }
      setOpen(false);
      onSuccess();
      form.reset();
    } catch (error) {
      toast.error(permission?.id ? "权限更新失败" : "权限创建失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{permission?.id ? "编辑权限" : "创建权限"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>权限名称</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入权限名称" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>描述</FormLabel>
                  <FormControl>
                    <Textarea placeholder="请输入权限描述" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>权限代码</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="如: USER_READ, ADMIN_WRITE"
                      {...field}
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

export default function PermissionsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const handleDelete = async (id: number) => {
    if (!confirm("确定要删除这个权限吗？")) return;

    try {
      await adminDeletePermission({ id });
      toast.success("权限删除成功");
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      toast.error("权限删除失败");
    }
  };

  const handleSuccess = () => {
    setRefreshKey((prev) => prev + 1);
    setShowCreateDialog(false);
  };

  const actionColumn: Column<API.BasePermissionVO> = {
    accessor: "id.",
    header: "操作",
    render: (_: any, row?: TableRow<API.BasePermissionVO>) => {
      if (!row) return null;
      const permission = row.data;

      return (
        <div className="flex justify-end space-x-2">
          <PermissionDialog
            permission={permission}
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
            onClick={() => handleDelete(permission.id!)}
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
          <Shield className="h-6 w-6" />
          <h1 className="text-2xl font-semibold">权限管理</h1>
        </div>
        <PermissionDialog
          onSuccess={handleSuccess}
          trigger={
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              创建权限
            </Button>
          }
        />
      </div>

      <DataManagementTable
        key={refreshKey}
        title=""
        icon={<></>}
        columns={[...columns, actionColumn]}
        isLoading={isLoading}
        searchPlaceholder="搜索权限..."
        queryFn={async ({ pageNum, pageSize }) => {
          const response = await adminGetPermissionPage(
            { pageNum, pageSize },
            {}
          );
          const pageData = response.data as API.PageBasePermissionVO;
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
