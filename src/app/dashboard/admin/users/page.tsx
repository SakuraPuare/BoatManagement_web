"use client";

import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Ban,
  Mail,
  MoreVertical,
  Pencil,
  Plus,
  RefreshCcw,
  Search,
  Shield,
  Trash2,
  Users,
} from "lucide-react";
import { UserSelf } from "@/types/user";
import { UserDialog } from "./user-dialog";
import { DataPagination } from "@/components/ui/data-pagination";
import {
  getRoleChineseNames,
  getRoleColors,
  ROLE_MASKS,
} from "@/lib/constants/role";
import { RoleDialog } from "./role-dialog";
import {
  deleteUser,
  fetchUserListPage,
  updateUserBlockStatus,
} from "@/services/admin/users";

const ITEMS_PER_PAGE = 10;
const defaultUser: UserSelf = {
  userId: 0,
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
  const [users, setUsers] = useState<UserSelf[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserSelf | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "blocked" | "inactive"
  >("all");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchUserListPage(currentPage, ITEMS_PER_PAGE);
      setUsers(response.records);
      setTotalPages(response.totalPage);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  const handleAdd = () => {
    setSelectedUser(defaultUser);
    setIsDialogOpen(true);
  };

  const handleDialogClose = (shouldRefresh?: boolean) => {
    setIsDialogOpen(false);
    if (shouldRefresh) {
      fetchUsers();
    }
  };

  const handleEdit = (user: UserSelf) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleDelete = async (userId: number) => {
    try {
      await deleteUser(userId);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleBlock = async (userId: number) => {
    const isBlocked = users.find((user) => user.userId === userId)?.isBlocked;
    try {
      await updateUserBlockStatus(userId, !!isBlocked);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRoleDialogClose = (shouldRefresh?: boolean) => {
    setIsRoleDialogOpen(false);
    if (shouldRefresh) {
      fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6" />
          <h1 className="text-2xl font-semibold">用户管理</h1>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          添加用户
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="搜索用户名、邮箱或电话..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value: "all" | "active" | "blocked" | "inactive") =>
            setStatusFilter(value)
          }
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="选择状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="active">正常</SelectItem>
            <SelectItem value="blocked">已封禁</SelectItem>
            <SelectItem value="inactive">未激活</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>用户ID</TableHead>
              <TableHead>用户名</TableHead>
              <TableHead>邮箱</TableHead>
              <TableHead>电话</TableHead>
              <TableHead>角色</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>创建时间</TableHead>
              <TableHead>更新时间</TableHead>
              <TableHead className="w-[100px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-10">
                  加载中...
                </TableCell>
              </TableRow>
            ) : (users?.length || 0) === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-10">
                  暂无数据
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.userId}>
                  <TableCell className="font-medium">{user.userId}</TableCell>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {getRoleChineseNames(user.role || 0).map((name, index) => (
                        <span
                          key={index}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColors(user.role || 0)[index]}`}
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.isBlocked
                            ? "bg-red-100 text-red-800"
                            : user.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.isBlocked
                          ? "已封禁"
                          : user.isActive
                            ? "正常"
                            : "未激活"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {format(new Date(user.createdAt || ""), "yyyy-MM-dd HH:mm:ss")}
                  </TableCell>
                  <TableCell>
                    {format(new Date(user.updatedAt || ""), "yyyy-MM-dd HH:mm:ss")}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(user)}>
                          <Pencil className="h-4 w-4 mr-2" />
                          编辑
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(user.userId || 0)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          删除
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleBlock(user.userId || 0)}
                        >
                          <Ban className="h-4 w-4 mr-2" />
                          {user.isBlocked ? "解除封禁" : "封禁"}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <RefreshCcw className="h-4 w-4 mr-2" />
                          重置密码
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="h-4 w-4 mr-2" />
                          发送邮件
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedUser(user);
                            setIsRoleDialogOpen(true);
                          }}
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          权限设置
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <DataPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={users?.length || 0}
        onPageChange={setCurrentPage}
      />

      <UserDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            handleDialogClose(true);
          }
          setIsDialogOpen(open);
        }}
        user={selectedUser || defaultUser}
      />

      <RoleDialog
        open={isRoleDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            handleRoleDialogClose(true);
          }
          setIsRoleDialogOpen(open);
        }}
        user={selectedUser || defaultUser}
      />
    </div>
  );
}
