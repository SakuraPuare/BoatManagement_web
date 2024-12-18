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
  Anchor,
  Ban,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { Dock } from "@/types/dock";
import { DockDialog } from "./dock-dialog";
import { DataPagination } from "@/components/ui/data-pagination";
import {
  deleteDock,
  fetchDockListPage,
  updateDockStatus,
} from "@/services/admin/docks";
import { STATUS_CODES, STATUS_NAMES } from "@/lib/constants/status";

const ITEMS_PER_PAGE = 10;

export default function DocksPage() {
  const [docks, setDocks] = useState<Dock[]>([]);
  const [selectedDock, setSelectedDock] = useState<Dock | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>(
    STATUS_CODES.ACTIVE.toString(),
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDocks = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchDockListPage(currentPage, ITEMS_PER_PAGE);
      setDocks(response.records);
      setTotalPages(response.totalPage);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  const handleAdd = () => {
    setSelectedDock(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (dock: Dock) => {
    setSelectedDock(dock);
    setIsDialogOpen(true);
  };

  const handleDelete = async (dockId: number) => {
    try {
      await deleteDock(dockId);
      fetchDocks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDialogClose = (shouldRefresh?: boolean) => {
    setIsDialogOpen(false);
    if (shouldRefresh) {
      fetchDocks();
    }
  };

  useEffect(() => {
    fetchDocks();
  }, [fetchDocks]);

  const handleToggleStatus = async (dockId: number) => {
    const isActive =
      docks.find((dock) => dock.dockId === dockId)?.status ===
      STATUS_CODES.ACTIVE;
    try {
      await updateDockStatus(
        dockId,
        isActive ? STATUS_CODES.INACTIVE : STATUS_CODES.ACTIVE,
      );
      fetchDocks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Anchor className="h-6 w-6" />
          <h1 className="text-2xl font-semibold">码头管理</h1>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          添加码头
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="搜索码头名称、代码或地址..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={statusFilter.toString()}
          onValueChange={(value: string) => setStatusFilter(value)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="选择状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={STATUS_CODES.ACTIVE.toString()}>正常</SelectItem>
            <SelectItem value={STATUS_CODES.INACTIVE.toString()}>
              停用
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>码头ID</TableHead>
              <TableHead>名称</TableHead>
              <TableHead>位置</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>创建时间</TableHead>
              <TableHead>更新时间</TableHead>
              <TableHead className="w-[100px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  加载中...
                </TableCell>
              </TableRow>
            ) : (docks?.length || 0) === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  暂无数据
                </TableCell>
              </TableRow>
            ) : (
              docks.map((dock) => (
                <TableRow key={dock.dockId}>
                  <TableCell className="font-medium">{dock.dockId}</TableCell>
                  <TableCell>{dock.dockName}</TableCell>
                  <TableCell>{dock.dockLocation}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        dock.status === STATUS_CODES.ACTIVE
                          ? "bg-green-100 text-green-800"
                          : dock.status === STATUS_CODES.INACTIVE
                            ? "bg-red-100 text-red-800"
                            : ""
                      }`}
                    >
                      {STATUS_NAMES[dock.status]}
                    </span>
                  </TableCell>
                  <TableCell>
                    {format(new Date(dock.createdAt), "yyyy-MM-dd HH:mm:ss")}
                  </TableCell>
                  <TableCell>
                    {format(new Date(dock.updatedAt), "yyyy-MM-dd HH:mm:ss")}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(dock)}>
                          <Pencil className="h-4 w-4 mr-2" />
                          编辑
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleToggleStatus(dock.dockId)}
                        >
                          <Ban className="h-4 w-4 mr-2" />
                          {dock.status === STATUS_CODES.ACTIVE
                            ? "停用"
                            : "启用"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(dock.dockId)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          删除
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
        totalItems={docks?.length || 0}
        onPageChange={setCurrentPage}
      />

      <DockDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            handleDialogClose(true);
          }
          setIsDialogOpen(open);
        }}
        dock={selectedDock}
      />
    </div>
  );
}
