"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Search,
  Plus,
  MoreVertical,
  Pencil,
  Trash2,
  UserCog,
} from "lucide-react";
import { UserDialog } from "./user-dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { api } from "@/lib/api";
import { ROLE_MASKS, ROLE_CHINESE_NAMES, ROLE_COLORS } from "@/lib/role";

import type { User } from "./types";
import { getUserStatus } from "@/lib/userStatus";
import { toast } from "sonner";
import { RoleDialog } from "./role-dialog";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);

  const fetchUsersPagination = async () => {
    const data = await api.get<{
      records: User[];
      totalRow: number;
    }>("/admin/users/page", {
      params: {
        page: page.toString(),
        pageSize: pageSize.toString(),
        search: searchQuery,
      },
    });

    return data;
  };

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const data = await fetchUsersPagination();
      setUsers(data.records);
      setTotal(data.totalRow);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("加载用户列表失败");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  useEffect(() => {
    loadUsers();
  }, [page, pageSize, searchQuery]);

  const handleAdd = () => {
    setSelectedUser(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleDelete = async (userId: number) => {
    await api.delete(`/admin/users/remove/${userId}`);
    loadUsers();
  };

  const handleSetRole = (user: User) => {
    setSelectedUser(user);
    setIsRoleDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">用户管理</h1>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          添加用户
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="搜索用户名、邮箱或手机号..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              {/* <TableHead>UUID</TableHead> */}
              <TableHead>用户ID</TableHead>
              <TableHead>用户名</TableHead>
              <TableHead>邮箱</TableHead>
              <TableHead>手机号</TableHead>
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
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-10">
                  暂无数据
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.userId}>
                  {/* <TableCell className="font-mono text-xs">
                    {user.uuid}
                  </TableCell> */}
                  <TableCell>{user.userId}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {Object.entries(ROLE_MASKS).map(([_, mask]) => {
                        if (user.role & mask) {
                          return (
                            <span
                              key={mask}
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ROLE_COLORS[mask]}`}
                            >
                              {ROLE_CHINESE_NAMES[mask]}
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          getUserStatus(
                            user.isBlocked ?? false,
                            user.isActive ?? false,
                          ).className
                        }`}
                      >
                        {
                          getUserStatus(
                            user.isBlocked ?? false,
                            user.isActive ?? false,
                          ).label
                        }
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleString("zh-CN")
                      : "-"}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {user.updatedAt
                      ? new Date(user.updatedAt).toLocaleString("zh-CN")
                      : "-"}
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
                          onClick={() => handleDelete(user.userId)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          删除
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSetRole(user)}>
                          <UserCog className="h-4 w-4 mr-2" />
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

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">共 {total} 条记录</div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              />
            </PaginationItem>
            {Array.from({
              length: Math.min(5, Math.ceil(total / pageSize)),
            }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => setPage(i + 1)}
                  isActive={page === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            {Math.ceil(total / pageSize) > 5 && <PaginationEllipsis />}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setPage((p) => Math.min(Math.ceil(total / pageSize), p + 1))
                }
                disabled={page >= Math.ceil(total / pageSize)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <UserDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            loadUsers();
          }
        }}
        user={selectedUser}
      />

      <RoleDialog
        open={isRoleDialogOpen}
        onOpenChange={(open) => {
          setIsRoleDialogOpen(open);
          if (!open) {
            loadUsers();
          }
        }}
        user={selectedUser}
      />
    </div>
  );
}
