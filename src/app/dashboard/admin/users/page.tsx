"use client";
import React, { useCallback, useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import { DialogForm, FieldConfig } from "@/components/data-form";
import { Filter, Page } from "@/components/data-table/types";
import {
  getRoleChineseNames,
  getRoleColors,
  ROLE_MASKS,
} from "@/lib/constants/role";
import {
  adminCreateUser,
  adminDeleteUser,
  adminGetUserPage,
  adminUpdateUser,
} from "@/services/api/adminUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import {
  Ban,
  Mail,
  Pencil,
  PlusCircle,
  RefreshCcw,
  Shield,
  Trash2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// 用户表单 Schema
export const userFormSchema = z
  .object({
    username: z
      .string()
      .min(2, "用户名至少需要2个字符")
      .max(50, "用户名不能超过50个字符")
      .regex(
        /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
        "用户名只能包含字母、数字、下划线和中文"
      )
      .optional()
      .or(z.literal("")),
    email: z
      .string()
      .email("请输入有效的邮箱地址")
      .optional()
      .or(z.literal("")),
    phone: z
      .string()
      .regex(/^1[3-9]\d{9}$/, "请输入有效的手机号码")
      .optional()
      .or(z.literal("")),
    role: z.number().default(ROLE_MASKS.USER),
    isActive: z.boolean().default(true),
  })
  .refine(
    (data) => {
      return !!(data.username || data.email || data.phone);
    },
    {
      message: "用户名、邮箱、手机号至少填写一项",
      path: ["username"],
    }
  );

export type UserFormValues = z.infer<typeof userFormSchema>;

// 默认表单值
export const defaultUserValues: Partial<UserFormValues> = {
  username: "",
  email: "",
  phone: "",
  role: ROLE_MASKS.USER,
  isActive: true,
};

// 表单字段配置
export const fieldConfigs: Record<keyof UserFormValues, FieldConfig> = {
  username: {
    type: "input",
    label: "用户名",
    placeholder: "请输入用户名",
  },
  email: {
    type: "input",
    label: "邮箱",
    placeholder: "请输入邮箱地址",
    inputProps: { type: "email" },
  },
  phone: {
    type: "input",
    label: "手机号码",
    placeholder: "请输入手机号码",
  },
  role: {
    type: "select",
    label: "用户角色",
    placeholder: "请选择用户角色",
    options: [
      { label: "普通用户", value: ROLE_MASKS.USER.toString() },
      { label: "管理员", value: ROLE_MASKS.ADMIN.toString() },
      { label: "商家", value: ROLE_MASKS.MERCHANT.toString() },
      { label: "供应商", value: ROLE_MASKS.VENDOR.toString() },
    ],
  },
  isActive: {
    type: "switch",
    label: "账户状态",
    placeholder: "启用/禁用账户",
  },
};

interface AddEditUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  user?: API.BaseAccountsVO | null;
}

function AddEditUserDialog({
  open,
  onOpenChange,
  onSuccess,
  user,
}: AddEditUserDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!user && user.id !== 0;

  // 创建表单方法
  const formMethods = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: isEditing
      ? {
          username: user?.username || "",
          email: user?.email || "",
          phone: user?.phone || "",
          role: user?.role || ROLE_MASKS.USER,
          isActive: user?.isActive || true,
        }
      : defaultUserValues,
  });

  // 监听 user 变化，更新表单默认值
  useEffect(() => {
    if (open) {
      if (isEditing && user) {
        formMethods.reset({
          username: user.username || "",
          email: user.email || "",
          phone: user.phone || "",
          role: user.role || ROLE_MASKS.USER,
          isActive: user.isActive || true,
        });
      } else {
        formMethods.reset(defaultUserValues);
      }
    }
  }, [user, open, isEditing, formMethods]);

  // 处理表单提交
  const handleSubmit = async (data: UserFormValues) => {
    setIsLoading(true);
    try {
      const payload: any = {
        username: data.username,
        email: data.email,
        phone: data.phone,
        role: data.role,
        isActive: data.isActive,
      };

      if (isEditing && user?.id) {
        // 更新用户
        await adminUpdateUser({ id: user.id }, payload);
        toast.success("用户更新成功");
      } else {
        // 创建用户
        await adminCreateUser(payload);
        toast.success("用户创建成功");
      }

      formMethods.reset(defaultUserValues);
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      console.error("Failed to save user:", error);
      toast.error(isEditing ? "更新用户失败" : "创建用户失败");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogForm
      title={isEditing ? "编辑用户" : "添加用户"}
      description={isEditing ? "修改用户信息" : "请填写用户信息"}
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) {
          formMethods.reset(defaultUserValues);
        }
      }}
      onSubmit={handleSubmit}
      formSchema={userFormSchema}
      defaultValues={
        isEditing
          ? {
              username: user?.username || "",
              email: user?.email || "",
              phone: user?.phone || "",
              role: user?.role || ROLE_MASKS.USER,
              isActive: user?.isActive || true,
            }
          : defaultUserValues
      }
      fieldConfigs={fieldConfigs}
      formMethods={formMethods}
      submitButtonText={isLoading ? "保存中..." : isEditing ? "更新" : "添加"}
      cancelButtonText="取消"
      showCancelButton={true}
      fieldOrder={["username", "email", "phone", "role", "isActive"]}
      key={user?.id ?? "new"}
    />
  );
}

export default function UsersPage() {
  // State for data table
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<Page>({
    pageNumber: 1,
    pageSize: 10,
  });
  const [filter, setFilter] = useState<Filter<API.BaseAccountsVO>>({
    filter: {},
    filterOptions: [
      {
        id: "isActive",
        label: "账户状态",
        options: [
          { label: "全部", value: "" },
          { label: "正常", value: "true" },
          { label: "禁用", value: "false" },
        ],
      },
      {
        id: "isBlocked",
        label: "封禁状态",
        options: [
          { label: "全部", value: "" },
          { label: "正常", value: "false" },
          { label: "已封禁", value: "true" },
        ],
      },
    ],
    search: null,
    sort: null,
    startDateTime: null,
    endDateTime: null,
  });
  const [users, setUsers] = useState<API.BaseAccountsVO[]>([]);

  // State for add/edit user dialog
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<API.BaseAccountsVO | null>(
    null
  );

  // State for delete confirmation
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  // Fetch users data
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await adminGetUserPage(
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

      setUsers(responseData?.records || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("获取用户列表失败");
    } finally {
      setIsLoading(false);
    }
  }, [filter, page.pageNumber, page.pageSize]);

  // Load data on component mount and when dependencies change
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Function to handle opening the add/edit dialog
  const handleOpenAddEditDialog = useCallback((user?: API.BaseAccountsVO) => {
    setEditingUser(
      user || {
        id: 0,
        username: "",
        email: "",
        phone: "",
        role: ROLE_MASKS.USER,
        isActive: true,
        isBlocked: false,
        createdAt: "",
        updatedAt: "",
      }
    );
    setIsAddEditDialogOpen(true);
  }, []);

  // Function to handle user deletion
  const handleDeleteUser = useCallback(
    async (userToDelete: API.BaseAccountsVO) => {
      if (!userToDelete?.id) return;

      setIsDeleting(userToDelete.id);
      try {
        await adminDeleteUser({ id: userToDelete.id });
        toast.success(`用户 "${userToDelete.username}" 删除成功`);
        fetchUsers();
      } catch (error) {
        console.error("Failed to delete user:", error);
        toast.error(`删除用户 "${userToDelete.username}" 失败`);
      } finally {
        setIsDeleting(null);
      }
    },
    [fetchUsers]
  );

  // Function to handle user blocking/unblocking
  const handleToggleBlock = useCallback(
    async (userToToggle: API.BaseAccountsVO) => {
      if (!userToToggle?.id) return;

      try {
        await adminUpdateUser(
          { id: userToToggle.id },
          { isBlocked: !userToToggle.isBlocked }
        );
        toast.success(
          `用户 "${userToToggle.username}" ${
            userToToggle.isBlocked ? "解除封禁" : "封禁"
          } 成功`
        );
        fetchUsers();
      } catch (error) {
        console.error("Failed to toggle user block:", error);
        toast.error(`操作失败`);
      }
    },
    [fetchUsers]
  );

  // Table columns definition
  const columns: ColumnDef<API.BaseAccountsVO>[] = [
    {
      id: "id",
      header: "用户ID",
      accessorKey: "id",
      enableSorting: true,
    },
    {
      id: "username",
      header: "用户名",
      accessorKey: "username",
      enableSorting: true,
    },
    {
      id: "email",
      header: "邮箱",
      accessorKey: "email",
      enableSorting: true,
    },
    {
      id: "phone",
      header: "电话",
      accessorKey: "phone",
      enableSorting: true,
    },
    {
      id: "role",
      header: "角色",
      cell: ({ row }) => {
        const role = row.original.role as number;
        return (
          <div className="flex gap-1">
            {getRoleChineseNames(role).map((name, index) => (
              <span
                key={index}
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  getRoleColors(role)[index]
                }`}
              >
                {name}
              </span>
            ))}
          </div>
        );
      },
      enableSorting: false,
    },
    {
      id: "status",
      header: "状态",
      cell: ({ row }) => {
        const user = row.original;
        const isBlocked = user.isBlocked;
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              isBlocked
                ? "bg-red-100 text-red-800"
                : user.isActive
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {isBlocked ? "已封禁" : user.isActive ? "正常" : "未激活"}
          </span>
        );
      },
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
      label: "编辑",
      icon: <Pencil className="mr-2 h-4 w-4" />,
      onClick: handleOpenAddEditDialog,
      disabled: (row: API.BaseAccountsVO) => isDeleting === row.id,
    },
    {
      label: (row: API.BaseAccountsVO) => (row.isBlocked ? "解除封禁" : "封禁"),
      icon: <Ban className="mr-2 h-4 w-4" />,
      onClick: handleToggleBlock,
      disabled: (row: API.BaseAccountsVO) => isDeleting === row.id,
    },
    {
      label: "重置密码",
      icon: <RefreshCcw className="mr-2 h-4 w-4" />,
      onClick: (row: API.BaseAccountsVO) => {
        toast.info("重置密码功能待开发");
      },
      disabled: (row: API.BaseAccountsVO) => isDeleting === row.id,
    },
    {
      label: "发送邮件",
      icon: <Mail className="mr-2 h-4 w-4" />,
      onClick: (row: API.BaseAccountsVO) => {
        toast.info("发送邮件功能待开发");
      },
      disabled: (row: API.BaseAccountsVO) => isDeleting === row.id,
    },
    {
      label: "权限设置",
      icon: <Shield className="mr-2 h-4 w-4" />,
      onClick: (row: API.BaseAccountsVO) => {
        toast.info("权限设置功能待开发");
      },
      disabled: (row: API.BaseAccountsVO) => isDeleting === row.id,
    },
    {
      label: "删除",
      icon: <Trash2 className="mr-2 h-4 w-4 text-red-500" />,
      onClick: handleDeleteUser,
      className: "text-red-500",
      disabled: (row: API.BaseAccountsVO) => !!isDeleting,
      loading: (row: API.BaseAccountsVO) => isDeleting === row.id,
      loadingText: "删除中...",
    },
  ];

  // Table toolbar actions
  const toolbars = [
    {
      label: "添加用户",
      icon: <PlusCircle />,
      onClick: () => handleOpenAddEditDialog(),
    },
  ];

  return (
    <>
      <AddEditUserDialog
        open={isAddEditDialogOpen}
        onOpenChange={setIsAddEditDialogOpen}
        onSuccess={() => {
          fetchUsers();
        }}
        user={editingUser}
      />

      <DataTable<API.BaseAccountsVO>
        title="用户管理"
        loading={isLoading}
        columns={columns}
        actions={actions}
        data={users}
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
