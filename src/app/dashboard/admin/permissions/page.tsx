"use client";

import React, { useCallback, useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import { DialogForm } from "@/components/data-form";
import { Filter, Page } from "@/components/data-table/types";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { Pencil, PlusCircle, Shield, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import {
  adminCreatePermission,
  adminDeletePermission,
  adminGetPermissionPage,
  adminUpdatePermission,
} from "@/services/api/adminPermission";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// 定义权限表单 Zod Schema
const permissionFormSchema = z.object({
  name: z.string().min(1, "权限名称不能为空"),
  code: z.string().min(1, "权限代码不能为空"),
  description: z.string().optional(),
});

type PermissionFormValues = z.infer<typeof permissionFormSchema>;

// 默认表单值
const defaultPermissionValues: Partial<PermissionFormValues> = {
  name: "",
  code: "",
  description: "",
};

// 表单字段配置
const fieldConfigs = {
  name: {
    type: "input" as const,
    label: "权限名称",
    placeholder: "请输入权限名称",
  },
  code: {
    type: "input" as const,
    label: "权限代码",
    placeholder: "如: USER_READ, ADMIN_WRITE",
  },
  description: {
    type: "textarea" as const,
    label: "描述",
    placeholder: "请输入权限描述 (可选)",
  },
};

// 添加/编辑权限对话框组件
function AddEditPermissionDialog({
  open,
  onOpenChange,
  onSuccess,
  permission,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  permission?: API.BasePermissionVO | null;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!permission;

  // 创建表单方法
  const formMethods = useForm<PermissionFormValues>({
    resolver: zodResolver(permissionFormSchema),
    defaultValues: isEditing
      ? {
          name: permission?.name || "",
          code: permission?.code || "",
          description: permission?.description || "",
        }
      : defaultPermissionValues,
  });

  // 监听 permission 变化，更新表单默认值
  useEffect(() => {
    if (open) {
      if (isEditing && permission) {
        formMethods.reset({
          name: permission.name || "",
          code: permission.code || "",
          description: permission.description || "",
        });
      } else {
        formMethods.reset(defaultPermissionValues);
      }
    }
  }, [permission, open, isEditing, formMethods]);

  // 处理表单提交
  const handleSubmit = async (data: PermissionFormValues) => {
    setIsLoading(true);
    try {
      const payload = {
        name: data.name,
        code: data.code,
        description: data.description,
      };

      if (isEditing && permission?.id) {
        // 更新权限
        await adminUpdatePermission({ id: permission.id }, payload);
        toast.success("权限更新成功");
      } else {
        // 创建权限
        await adminCreatePermission(payload);
        toast.success("权限创建成功");
      }

      formMethods.reset(defaultPermissionValues);
      onOpenChange(false);
      onSuccess(); // 刷新列表
    } catch (error) {
      console.error("Failed to save permission:", error);
      toast.error(isEditing ? "更新权限失败" : "创建权限失败");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogForm
      title={isEditing ? "编辑权限" : "添加权限"}
      description={isEditing ? "修改权限信息" : "请填写权限信息"}
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) {
          formMethods.reset(defaultPermissionValues);
        }
      }}
      onSubmit={handleSubmit}
      formSchema={permissionFormSchema}
      defaultValues={
        isEditing
          ? {
              name: permission?.name || "",
              code: permission?.code || "",
              description: permission?.description || "",
            }
          : defaultPermissionValues
      }
      fieldConfigs={fieldConfigs}
      formMethods={formMethods}
      submitButtonText={isLoading ? "保存中..." : isEditing ? "更新" : "添加"}
      cancelButtonText="取消"
      showCancelButton={true}
      fieldOrder={["name", "code", "description"]}
      key={permission?.id ?? "new"}
    />
  );
}

export default function PermissionsPage() {
  // State for data table
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<Page>({
    pageNumber: 1,
    pageSize: 10,
  });
  const [filter, setFilter] = useState<Filter<API.BasePermissionVO>>({
    filter: {},
    filterOptions: [],
    search: null,
    sort: null,
    startDateTime: null,
    endDateTime: null,
  });
  const [permissions, setPermissions] = useState<API.BasePermissionVO[]>([]);

  // State for add/edit permission dialog
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [editingPermission, setEditingPermission] =
    useState<API.BasePermissionVO | null>(null);

  // State for delete confirmation dialog
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  // Fetch permissions data
  const fetchPermissions = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await adminGetPermissionPage(
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

      const pageData = res.data?.data; // First data is response wrapper, second data is actual PageBasePermissionVO
      setPage({
        pageNumber: pageData?.pageNumber || 1,
        pageSize: pageData?.pageSize || 10,
        totalPage: pageData?.totalPage,
        totalRow: pageData?.totalRow,
      });

      setPermissions(pageData?.records || []);
    } catch (error) {
      console.error("Failed to fetch permissions:", error);
      toast.error("获取权限列表失败");
    } finally {
      setIsLoading(false);
    }
  }, [filter, page.pageNumber, page.pageSize]);

  // Load data on component mount and when dependencies change
  useEffect(() => {
    fetchPermissions();
  }, [fetchPermissions]);

  // Function to handle opening the add/edit dialog
  const handleOpenAddEditDialog = useCallback(
    (permission?: API.BasePermissionVO) => {
      setEditingPermission(permission || null);
      setIsAddEditDialogOpen(true);
    },
    []
  );

  // Function to handle permission deletion
  const handleDeletePermission = useCallback(
    async (permissionToDelete: API.BasePermissionVO) => {
      if (!permissionToDelete?.id) return;

      setIsDeleting(permissionToDelete.id);
      try {
        await adminDeletePermission({ id: permissionToDelete.id });
        toast.success(`权限 "${permissionToDelete.name}" 删除成功`);
        fetchPermissions();
      } catch (error) {
        console.error("Failed to delete permission:", error);
        toast.error(`删除权限 "${permissionToDelete.name}" 失败`);
      } finally {
        setIsDeleting(null);
      }
    },
    [fetchPermissions]
  );

  // Table columns definition
  const columns: ColumnDef<API.BasePermissionVO>[] = [
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
      enableSorting: true,
    },
    {
      id: "name",
      header: "权限名称",
      accessorKey: "name",
      enableSorting: true,
    },
    {
      id: "code",
      header: "权限代码",
      accessorKey: "code",
      enableSorting: true,
    },
    {
      id: "description",
      header: "描述",
      accessorKey: "description",
      enableSorting: false,
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
      icon: <Pencil className="mr-2 h-4 w-4" />,
      onClick: handleOpenAddEditDialog,
      disabled: (row: API.BasePermissionVO) => isDeleting === row.id,
    },
    {
      label: "删除",
      icon: <Trash2 className="mr-2 h-4 w-4 text-red-500" />,
      onClick: handleDeletePermission,
      className: "text-red-500",
      disabled: (row: API.BasePermissionVO) => !!isDeleting,
      loading: (row: API.BasePermissionVO) => isDeleting === row.id,
      loadingText: "删除中...",
    },
  ];

  // Table toolbar actions
  const toolbars = [
    {
      label: "添加权限",
      icon: <PlusCircle />,
      onClick: () => handleOpenAddEditDialog(),
    },
  ];

  return (
    <>
      <AddEditPermissionDialog
        open={isAddEditDialogOpen}
        onOpenChange={setIsAddEditDialogOpen}
        onSuccess={() => {
          fetchPermissions();
        }}
        permission={editingPermission}
      />

      <DataTable<API.BasePermissionVO>
        title="权限管理"
        description={
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <span>管理系统权限配置</span>
          </div>
        }
        loading={isLoading}
        columns={columns}
        actions={actions}
        data={permissions}
        toolbars={toolbars}
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
    </>
  );
}
