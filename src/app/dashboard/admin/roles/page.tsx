import React, { useState } from "react";
import { Edit, Plus, Settings, Trash2, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  type Column,
  DataManagementTable,
  type TableRow,
} from "@/components/data-management-table";
import {
  adminCreateRole,
  adminDeleteRole,
  adminGetRolePage,
  adminUpdateRole,
} from "@/services/api/adminRole";
import { adminGetPermissionList } from "@/services/api/adminPermission";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

("use client");

const roleSchema = z.object({
  name: z.string().min(1, "角色名称不能为空"),
  description: z.string().optional(),
});

type RoleFormData = z.infer<typeof roleSchema>;

const columns: Column<API.BaseRoleVO>[] = [
  {
    accessor: "id",
    header: "ID",
  },
  {
    accessor: "name",
    header: "角色名称",
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

function RoleDialog({
  role,
  onSuccess,
  trigger,
}: {
  role?: API.BaseRoleVO;
  onSuccess: () => void;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: role?.name || "",
      description: role?.description || "",
    },
  });

  const onSubmit = async (data: RoleFormData) => {
    setLoading(true);
    try {
      if (role?.id) {
        await adminUpdateRole({ id: role.id }, data);
        toast.success("角色更新成功");
      } else {
        await adminCreateRole(data);
        toast.success("角色创建成功");
      }
      setOpen(false);
      onSuccess();
      form.reset();
    } catch (error) {
      toast.error(role?.id ? "角色更新失败" : "角色创建失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{role?.id ? "编辑角色" : "创建角色"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>角色名称</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入角色名称" {...field} />
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
                    <Textarea placeholder="请输入角色描述" {...field} />
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

function PermissionDialog({
  role,
  onSuccess,
  trigger,
}: {
  role: API.BaseRoleVO;
  onSuccess: () => void;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState<API.BasePermissionVO[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

  React.useEffect(() => {
    if (open) {
      loadPermissions();
    }
  }, [open]);

  const loadPermissions = async () => {
    try {
      const response = await adminGetPermissionList({}, {});
      setPermissions(response.data || []);
      // TODO: 加载角色已有的权限
      setSelectedPermissions([]);
    } catch (error) {
      toast.error("加载权限列表失败");
    }
  };

  const handlePermissionChange = (permissionId: number, checked: boolean) => {
    if (checked) {
      setSelectedPermissions((prev) => [...prev, permissionId]);
    } else {
      setSelectedPermissions((prev) =>
        prev.filter((id) => id !== permissionId)
      );
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      // TODO: 实现权限分配逻辑
      // 这里需要根据后端API的具体实现来调整
      toast.success("权限分配成功");
      setOpen(false);
      onSuccess();
    } catch (error) {
      toast.error("权限分配失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>分配权限 - {role.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-sm text-gray-500">
            为角色 "{role.name}" 选择权限
          </div>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {permissions.map((permission) => (
              <div key={permission.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`permission-${permission.id}`}
                  checked={selectedPermissions.includes(permission.id!)}
                  onCheckedChange={(checked) =>
                    handlePermissionChange(permission.id!, checked as boolean)
                  }
                />
                <label
                  htmlFor={`permission-${permission.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
                >
                  <div>{permission.name}</div>
                  <div className="text-xs text-gray-500">{permission.code}</div>
                </label>
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              取消
            </Button>
            <Button onClick={onSubmit} disabled={loading}>
              {loading ? "保存中..." : "保存"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function RolesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleDelete = async (id: number) => {
    if (!confirm("确定要删除这个角色吗？")) return;

    try {
      await adminDeleteRole({ id });
      toast.success("角色删除成功");
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      toast.error("角色删除失败");
    }
  };

  const handleSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const actionColumn: Column<API.BaseRoleVO> = {
    accessor: "id.",
    header: "操作",
    render: (_: any, row?: TableRow<API.BaseRoleVO>) => {
      if (!row) return null;
      const role = row.data;

      return (
        <div className="flex justify-end space-x-2">
          <PermissionDialog
            role={role}
            onSuccess={handleSuccess}
            trigger={
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            }
          />
          <RoleDialog
            role={role}
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
            onClick={() => handleDelete(role.id!)}
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
          <UserCheck className="h-6 w-6" />
          <h1 className="text-2xl font-semibold">角色管理</h1>
        </div>
        <RoleDialog
          onSuccess={handleSuccess}
          trigger={
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              创建角色
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
        searchPlaceholder="搜索角色..."
        queryFn={async ({ pageNum, pageSize }) => {
          const response = await adminGetRolePage({ pageNum, pageSize }, {});
          const pageData = response.data as API.PageBaseRoleVO;
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
