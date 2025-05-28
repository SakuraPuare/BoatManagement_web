"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataPagination } from "@/components/ui/data-pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { vendorDeleteBoat, vendorGetBoatPage } from "@/services/api/vendorBoat";
import { getBoatTypeList } from "@/services/api/vendorBoatType";
import { getDockList } from "@/services/api/vendorDock";
import { format } from "date-fns";
import {
  Anchor,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { BoatDialog } from "./boat-dialog";

const ITEMS_PER_PAGE = 10;

export default function VendorBoatsPage() {
  const [boats, setBoats] = useState<API.BaseBoatsVO[]>([]);
  const [selectedBoat, setSelectedBoat] = useState<API.BaseBoatsVO | null>(
    null
  );
  const [boatTypes, setBoatTypes] = useState<API.BaseBoatTypesVO[]>([]);
  const [docks, setDocks] = useState<API.BaseDocksVO[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchBoats = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await vendorGetBoatPage(
        { pageNum: currentPage, pageSize: ITEMS_PER_PAGE },
        {}
      );
      console.log(response.data?.records);
      setBoats(response.data?.records || []);
      setTotalPages(response.data?.totalPage || 0);
    } catch (error) {
      console.error(error);
      toast.error("获取船只列表失败");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  const fetchData = useCallback(async () => {
    try {
      const [boatTypesResponse, docksResponse] = await Promise.all([
        getBoatTypeList({}, {}),
        getDockList({}, {}),
      ]);
      console.log(boats);
      console.log(boatTypesResponse?.data);
      console.log(docksResponse?.data);
      setBoatTypes(boatTypesResponse.data || []);
      setDocks(docksResponse.data || []);
    } catch (error) {
      console.error(error);
      toast.error("获取数据失败");
    }
  }, []);

  const handleAdd = () => {
    setSelectedBoat(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (boat: API.BaseBoatsVO) => {
    setSelectedBoat(boat);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await vendorDeleteBoat({ id });
      toast.success("删除成功");
      await fetchBoats();
    } catch (error) {
      console.error(error);
      toast.error("删除失败");
    }
  };

  useEffect(() => {
    fetchBoats();
    fetchData();
  }, [fetchBoats, fetchData]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Anchor className="h-6 w-6" />
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
            placeholder="搜索船名..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>船只ID</TableHead>
              <TableHead>船名</TableHead>
              <TableHead>船型</TableHead>
              <TableHead>所在码头</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>创建时间</TableHead>
              <TableHead>更新时间</TableHead>
              <TableHead className="w-[100px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-10">
                  加载中...
                </TableCell>
              </TableRow>
            ) : boats.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-10">
                  暂无数据
                </TableCell>
              </TableRow>
            ) : (
              boats.map((boat) => (
                <TableRow key={boat.id}>
                  <TableCell>{boat.id}</TableCell>
                  <TableCell>{boat.name}</TableCell>
                  <TableCell>
                    {
                      boatTypes.find((type) => type.id === boat.typeId)
                        ?.typeName
                    }
                  </TableCell>
                  <TableCell>
                    {docks.find((dock) => dock.id === boat.dockId)?.name}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        boat.isEnabled
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {boat.isEnabled ? "启用" : "停用"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {boat.createdAt &&
                      format(new Date(boat.createdAt), "yyyy-MM-dd HH:mm:ss")}
                  </TableCell>
                  <TableCell>
                    {boat.updatedAt &&
                      format(new Date(boat.updatedAt), "yyyy-MM-dd HH:mm:ss")}
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
                        <DropdownMenuItem
                          onClick={() => handleDelete(boat.id!)}
                          className="text-red-600"
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
        totalItems={boats.length}
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
    </div>
  );
}
