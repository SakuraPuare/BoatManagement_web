"use client";
import React, { useCallback, useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import { DialogForm, FieldConfig } from "@/components/data-form";
import { Filter, Page } from "@/components/data-table/types";
import {
  adminCreateRole,
  adminDeleteRole,
  adminGetRolePage,
  adminUpdateRole,
} from "@/services/api/adminRole";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { Pencil, PlusCircle, Settings, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// 定义角色表单 Zod Schema
export const roleFormSchema = z.object({
  name: z.string().min(1, "角色名称不能为空"),
  description: z.string().optional(),
});

export type RoleFormValues = z.infer<typeof roleFormSchema>;

// 默认表单值
export const defaultRoleValues: Partial<RoleFormValues> = {
  name: "",
  description: "",
};

// 表单字段配置
export const fieldConfigs: Record<keyof RoleFormValues, FieldConfig> = {
  name: {
    type: "input",
    label: "角色名称",
    placeholder: "请输入角色名称",
  },
  description: {
    type: "textarea",
    label: "描述",
    placeholder: "请输入角色描述 (可选)",
  },
};

interface AddEditRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  role?: API.BaseRoleVO | null;
}

function AddEditRoleDialog({
  open,
  onOpenChange,
  onSuccess,
  role,
}: AddEditRoleDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!role;

  // 创建表单方法
  const formMethods = useForm<RoleFormValues>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: isEditing
      ? {
          name: role?.name || "",
          description: role?.description || "",
        }
      : defaultRoleValues,
  });

  // 监听 role 变化，更新表单默认值
  useEffect(() => {
    if (open) {
      if (isEditing && role) {
        formMethods.reset({
          name: role.name || "",
          description: role.description || "",
        });
      } else {
        formMethods.reset(defaultRoleValues);
      }
    }
  }, [role, open, isEditing, formMethods]);

  // 处理表单提交
  const handleSubmit = async (data: RoleFormValues) => {
    setIsLoading(true);
    try {
      const payload: API.BaseRoleDTO = {
        name: data.name,
        description: data.description,
      };

      if (isEditing && role?.id) {
        // 更新角色
        await adminUpdateRole({ id: role.id }, payload);
        toast.success("角色更新成功");
      } else {
        // 创建角色
        await adminCreateRole(payload);
        toast.success("角色创建成功");
      }

      formMethods.reset(defaultRoleValues);
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      console.error("Failed to save role:", error);
      toast.error(isEditing ? "更新角色失败" : "创建角色失败");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogForm
      title={isEditing ? "编辑角色" : "添加角色"}
      description={isEditing ? "修改角色信息" : "请填写角色信息"}
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) {
          formMethods.reset(defaultRoleValues);
        }
      }}
      onSubmit={handleSubmit}
      formSchema={roleFormSchema}
      defaultValues={
        isEditing
          ? {
              name: role?.name || "",
              description: role?.description || "",
            }
          : defaultRoleValues
      }
      fieldConfigs={fieldConfigs}
      formMethods={formMethods}
      submitButtonText={isLoading ? "保存中..." : isEditing ? "更新" : "添加"}
      cancelButtonText="取消"
      showCancelButton={true}
      fieldOrder={["name", "description"]}
      key={role?.id ?? "new"}
    />
  );
}

export default function RolesPage() {
  // State for data table
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<Page>({
    pageNumber: 1,
    pageSize: 10,
  });
  const [filter, setFilter] = useState<Filter<API.BaseRoleVO>>({
    filter: {},
    filterOptions: [],
    search: null,
    sort: null,
    startDateTime: null,
    endDateTime: null,
  });
  const [roles, setRoles] = useState<API.BaseRoleVO[]>([]);

  // State for add/edit role dialog
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<API.BaseRoleVO | null>(null);

  // State for delete confirmation
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  // Fetch roles data
  const fetchRoles = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await adminGetRolePage(
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

      // 处理响应数据的结构
      const responseData = res.data as any;
      setPage({
        pageNumber: responseData?.pageNum || 1,
        pageSize: responseData?.pageSize || 10,
        totalPage: responseData?.totalPage,
        totalRow: responseData?.totalRow,
      });

      setRoles(responseData?.records || []);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
      toast.error("获取角色列表失败");
    } finally {
      setIsLoading(false);
    }
  }, [filter, page.pageNumber, page.pageSize]);

  // Load data on component mount and when dependencies change
  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  // Function to handle opening the add/edit dialog
  const handleOpenAddEditDialog = useCallback((role?: API.BaseRoleVO) => {
    setEditingRole(role || null);
    setIsAddEditDialogOpen(true);
  }, []);

  // Function to handle role deletion
  const handleDeleteRole = useCallback(
    async (roleToDelete: API.BaseRoleVO) => {
      if (!roleToDelete?.id) return;

      setIsDeleting(roleToDelete.id);
      try {
        await adminDeleteRole({ id: roleToDelete.id });
        toast.success(`角色 "${roleToDelete.name}" 删除成功`);
        fetchRoles();
      } catch (error) {
        console.error("Failed to delete role:", error);
        toast.error(`删除角色 "${roleToDelete.name}" 失败`);
      } finally {
        setIsDeleting(null);
      }
    },
    [fetchRoles]
  );

  // Table columns definition
  const columns: ColumnDef<API.BaseRoleVO>[] = [
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
      enableSorting: true,
    },
    {
      id: "name",
      header: "角色名称",
      accessorKey: "name",
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
    {
      id: "updatedAt",
      header: "更新时间",
      cell: ({ row }) =>
        row.original.updatedAt
          ? formatDate(row.original.updatedAt, "yyyy-MM-dd HH:mm:ss")
          : "-",
      enableSorting: true,
    },
  ];

  // Table row actions
  const actions = [
    {
      label: "权限设置",
      icon: <Settings className="mr-2 h-4 w-4" />,
      onClick: (row: API.BaseRoleVO) => {
        // TODO: 实现权限设置功能
        toast.info("权限设置功能待开发");
      },
      disabled: (row: API.BaseRoleVO) => isDeleting === row.id,
    },
    {
      label: "编辑",
      icon: <Pencil className="mr-2 h-4 w-4" />,
      onClick: handleOpenAddEditDialog,
      disabled: (row: API.BaseRoleVO) => isDeleting === row.id,
    },
    {
      label: "删除",
      icon: <Trash2 className="mr-2 h-4 w-4 text-red-500" />,
      onClick: handleDeleteRole,
      className: "text-red-500",
      disabled: (row: API.BaseRoleVO) => !!isDeleting,
      loading: (row: API.BaseRoleVO) => isDeleting === row.id,
      loadingText: "删除中...",
    },
  ];

  // Table toolbar actions
  const toolbars = [
    {
      label: "添加角色",
      icon: <PlusCircle />,
      onClick: () => handleOpenAddEditDialog(),
    },
  ];

  return (
    <>
      <AddEditRoleDialog
        open={isAddEditDialogOpen}
        onOpenChange={setIsAddEditDialogOpen}
        onSuccess={() => {
          fetchRoles();
        }}
        role={editingRole}
      />

      <DataTable<API.BaseRoleVO>
        title="角色管理"
        loading={isLoading}
        columns={columns}
        actions={actions}
        data={roles}
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
