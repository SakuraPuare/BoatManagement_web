"use client";

import { useCallback, useEffect, useState } from "react";
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
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Ship,
  Trash2,
} from "lucide-react";
import type { API } from "@/services/api/typings";
import { BOAT_STATUS_CODES } from "@/lib/constants/boat-type";
import { BoatDialog } from "./boat-dialog";
import { DataPagination } from "@/components/ui/data-pagination";
import { delete3, listPage3 } from "@/services/api/adminBoat";
import { getDocksPage } from "@/services/api/adminDock";
import { listPage4 } from "@/services/api/adminBoatType";
import { BoatStatusDialog } from "./status-dialog";

const ITEMS_PER_PAGE = 10;

export default function BoatsPage() {
  const [boats, setBoats] = useState<API.BaseBoatsVO[]>([]);
  const [selectedBoat, setSelectedBoat] = useState<API.BaseBoatsVO | null>(
    null
  );
  const [boatTypes, setBoatTypes] = useState<API.BaseBoatTypesVO[]>([]);
  const [docks, setDocks] = useState<API.BaseDocksVO[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);

  const fetchBoats = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await listPage3(
        { page: currentPage, size: ITEMS_PER_PAGE },
        {}
      );

      setBoats(response.data?.data?.records || []);
      setTotalPages(response.data?.data?.totalPage || 0);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  const fetchData = useCallback(async () => {
    const fetchBoatTypes = async () => {
      const response = await listPage4(
        { page: currentPage, size: ITEMS_PER_PAGE },
        {}
      );
      setBoatTypes(response.data?.data?.records || []);
    };

    const fetchDocks = async () => {
      const response = await getDocksPage(
        { pageNum: currentPage, pageSize: ITEMS_PER_PAGE },
        {}
      );
      setDocks(response.data?.data?.records || []);
    };

    await fetchBoatTypes();
    await fetchDocks();
    await fetchBoats();
  }, [fetchBoats]);

  const handleAdd = () => {
    setSelectedBoat(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (boat: API.BaseBoatsVO) => {
    setSelectedBoat(boat);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number | undefined) => {
    if (!id) return;
    try {
      await delete3({ id: id });
      fetchBoats();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Ship className="h-6 w-6" />
          <h1 className="text-2xl font-semibold">船只管理</h1>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          添加船只
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="搜索船名、注册号..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="选择状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value={BOAT_STATUS_CODES.ACTIVE.toString()}>
              可用
            </SelectItem>
            <SelectItem value={BOAT_STATUS_CODES.MAINTENANCE.toString()}>
              维护中
            </SelectItem>
            <SelectItem value={BOAT_STATUS_CODES.INACTIVE.toString()}>
              停用
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>船只ID</TableHead>
              <TableHead>船名</TableHead>
              <TableHead>船型</TableHead>
              <TableHead>船主ID</TableHead>
              <TableHead>船主单位ID</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>创建时间</TableHead>
              <TableHead>更新时间</TableHead>
              <TableHead className="w-[100px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={11} className="text-center py-10">
                  加载中...
                </TableCell>
              </TableRow>
            ) : (boats?.length || 0) === 0 ? (
              <TableRow>
                <TableCell colSpan={11} className="text-center py-10">
                  暂无数据
                </TableCell>
              </TableRow>
            ) : (
              boats.map((boat) => (
                <TableRow key={boat.id}>
                  <TableCell className="font-medium">{boat.id}</TableCell>
                  <TableCell>{boat.name}</TableCell>
                  <TableCell>
                    {
                      boatTypes.find((type) => type.id === boat.boatTypeId)
                        ?.typeName
                    }
                  </TableCell>
                  <TableCell>
                    {
                      boatTypes.find((type) => type.id === boat.boatTypeId)
                        ?.maxLoad
                    }
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        boat.status === BOAT_STATUS_CODES.ACTIVE.toString()
                          ? "bg-green-100 text-green-800"
                          : boat.status ===
                            BOAT_STATUS_CODES.MAINTENANCE.toString()
                          ? "bg-blue-100 text-blue-800"
                          : boat.status ===
                            BOAT_STATUS_CODES.INACTIVE.toString()
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {boat.status !== undefined
                        ? boat.status === BOAT_STATUS_CODES.ACTIVE.toString()
                          ? "可用"
                          : boat.status ===
                            BOAT_STATUS_CODES.MAINTENANCE.toString()
                          ? "维护中"
                          : "停用"
                        : "未知"}
                    </span>
                  </TableCell>
                  <TableCell>{boat.createdAt}</TableCell>
                  <TableCell>{boat.updatedAt}</TableCell>
                  <TableCell>
                    {docks.find((dock) => dock.id === boat.dockId)?.name}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(boat)}>
                          <Pencil className="h-4 w-4 mr-2" />
                          编辑
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(boat.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          删除
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedBoat(boat);
                            setIsStatusDialogOpen(true);
                          }}
                        >
                          <Anchor className="h-4 w-4 mr-2" />
                          状态设置
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
        totalItems={boats?.length || 0}
        onPageChange={setCurrentPage}
      />

      <BoatDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            fetchBoats();
          }
          setIsDialogOpen(open);
        }}
        boat={selectedBoat}
        boatTypes={boatTypes}
        docks={docks}
      />

      <BoatStatusDialog
        open={isStatusDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            fetchBoats();
          }
          setIsStatusDialogOpen(open);
        }}
        boat={selectedBoat || null}
      />
    </div>
  );
}
