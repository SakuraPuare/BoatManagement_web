"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Ban,
  Mail,
  Pencil,
  RefreshCcw,
  Shield,
  Trash2,
  Users,
} from "lucide-react";
import { API } from "@/services/api/typings";
import { UserDialog } from "./user-dialog";
import {
  getRoleChineseNames,
  getRoleColors,
  ROLE_MASKS,
} from "@/lib/constants/role";
import { RoleDialog } from "./role-dialog";
import {
  Column,
  DataManagementTable,
} from "@/components/data-management-table";
import { delete1, listPage1, update1 } from "@/services/api/adminUser";

const ITEMS_PER_PAGE = 10;
const defaultUser: API.BaseAccountsVO = {
  id: 0,
  username: "",
  email: "",
  phone: "",
  role: ROLE_MASKS.USER,
  isActive: true,
  isBlocked: false,
  createdAt: "",
  updatedAt: "",
};

export default function UsersPage() {
  const [users, setUsers] = useState<API.BaseAccountsVO[]>([]);
  const [selectedUser, setSelectedUser] = useState<API.BaseAccountsVO | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "blocked" | "inactive"
  >("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await listPage1(
        { page: currentPage, size: ITEMS_PER_PAGE },
        {
          username: "",
          ...(statusFilter === "active" && {
            isActive: true,
            isBlocked: false,
          }),
          ...(statusFilter === "blocked" && { isBlocked: true }),
          ...(statusFilter === "inactive" && { isActive: false }),
        }
      );
      if (response.data?.data?.records) {
        setUsers(response.data.data.records);
        setTotalPages(response.data.data.totalPage || 0);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, statusFilter]);

  const handleAdd = () => {
    setSelectedUser(defaultUser);
    setIsDialogOpen(true);
  };

  const handleEdit = (user: API.BaseAccountsVO) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleDelete = async (userId: number) => {
    try {
      await delete1({ id: userId });
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleBlock = async (userId: number) => {
    const isBlocked = users.find((user) => user.id === userId)?.isBlocked;
    try {
      await update1({ id: userId }, { username: "", isActive: !isBlocked });
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const columns: Column<API.BaseAccountsVO>[] = [
    { header: "用户ID", accessor: "id" as keyof API.BaseAccountsVO },
    { header: "用户名", accessor: "username" as keyof API.BaseAccountsVO },
    { header: "邮箱", accessor: "email" as keyof API.BaseAccountsVO },
    { header: "电话", accessor: "phone" as keyof API.BaseAccountsVO },
    {
      header: "角色",
      accessor: "role",
      render: (value: number) => (
        <div className="flex gap-1">
          {getRoleChineseNames(value || 0).map((name, index) => (
            <span
              key={index}
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                getRoleColors(value || 0)[index]
              }`}
            >
              {name}
            </span>
          ))}
        </div>
      ),
    },
    {
      header: "状态",
      accessor: "isBlocked",
      render: (value: boolean, user: API.BaseAccountsVO) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            value
              ? "bg-red-100 text-red-800"
              : user.isActive
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {value ? "已封禁" : user.isActive ? "正常" : "未激活"}
        </span>
      ),
    },
    {
      header: "创建时间",
      accessor: "createdAt",
      render: (value: string) => value,
    },
    {
      header: "更新时间",
      accessor: "updatedAt",
      render: (value: string) => value,
    },
  ];

  const actions = [
    {
      icon: <Pencil className="h-4 w-4 mr-2" />,
      label: "编辑",
      onClick: handleEdit,
    },
    {
      icon: <Trash2 className="h-4 w-4 mr-2" />,
      label: "删除",
      onClick: (user: API.BaseAccountsVO) => handleDelete(user.id || 0),
    },
    {
      icon: <Ban className="h-4 w-4 mr-2" />,
      label: (user: API.BaseAccountsVO) =>
        user.isBlocked ? "解除封禁" : "封禁",
      onClick: (user: API.BaseAccountsVO) => handleBlock(user.id || 0),
    },
    {
      icon: <RefreshCcw className="h-4 w-4 mr-2" />,
      label: "重置密码",
      onClick: () => {},
    },
    {
      icon: <Mail className="h-4 w-4 mr-2" />,
      label: "发送邮件",
      onClick: () => {},
    },
    {
      icon: <Shield className="h-4 w-4 mr-2" />,
      label: "权限设置",
      onClick: (user: API.BaseAccountsVO) => {
        setSelectedUser(user);
        setIsRoleDialogOpen(true);
      },
    },
  ];

  return (
    <>
      <DataManagementTable
        title="用户管理"
        icon={<Users className="h-6 w-6" />}
        data={users}
        isLoading={isLoading}
        columns={columns}
        actions={actions}
        searchPlaceholder="搜索用户名、邮箱或电话..."
        statusFilter={{
          value: statusFilter,
          onChange: (value) =>
            setStatusFilter(value as "all" | "active" | "blocked" | "inactive"),
          options: [
            { value: "all", label: "全部状态" },
            { value: "active", label: "正常" },
            { value: "blocked", label: "已封禁" },
            { value: "inactive", label: "未激活" },
          ],
        }}
        pagination={{
          currentPage,
          totalPages,
          totalItems: users.length,
          onPageChange: setCurrentPage,
        }}
        onAdd={handleAdd}
      />

      <UserDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            fetchUsers();
          }
          setIsDialogOpen(open);
        }}
        user={selectedUser || defaultUser}
      />

      <RoleDialog
        open={isRoleDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            fetchUsers();
          }
          setIsRoleDialogOpen(open);
        }}
        user={selectedUser || defaultUser}
      />
    </>
  );
}
