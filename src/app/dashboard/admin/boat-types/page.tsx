import React, { useCallback, useEffect, useState } from "react";
import { BoatTypeDialog } from "@/app/dashboard/admin/boat-types/boat-type-dialog";
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
import {
  adminDeleteBoatType,
  adminGetBoatTypePage,
  adminUpdateBoatType,
} from "@/services/api/adminBoatType";
import { format } from "date-fns";
import {
  Anchor,
  Ban,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";



const ITEMS_PER_PAGE = 10;

export default function BoatTypesPage() {
  const [boatTypes, setBoatTypes] = useState<API.BaseBoatTypesVO[]>([]);
  const [selectedBoatType, setSelectedBoatType] =
    useState<API.BaseBoatTypesVO | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBoatTypes = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await adminGetBoatTypePage(
        { pageNum: currentPage, pageSize: ITEMS_PER_PAGE },
        {}
      );
      setBoatTypes(response.data?.records || []);
      setTotalPages(response.data?.totalPage || 0);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  const handleAdd = () => {
    setSelectedBoatType(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (boatType: API.BaseBoatTypesVO) => {
    setSelectedBoatType(boatType);
    setIsDialogOpen(true);
  };

  const handleDelete = async (boatTypeId: number) => {
    try {
      await adminDeleteBoatType({ id: boatTypeId });
      await fetchBoatTypes();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDialogClose = (shouldRefresh?: boolean) => {
    setIsDialogOpen(false);
    if (shouldRefresh) {
      fetchBoatTypes();
    }
  };

  const handleStatus = async (boatTypeId: number, isEnabled: boolean) => {
    try {
      await adminUpdateBoatType({ id: boatTypeId }, { isEnabled });
      await fetchBoatTypes();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBoatTypes();
  }, [fetchBoatTypes]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Anchor className="h-6 w-6" />
          <h1 className="text-2xl font-semibold">船型管理</h1>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          添加船型
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="搜索船型名称..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>名称</TableHead>
              <TableHead>描述</TableHead>
              <TableHead>长度</TableHead>
              <TableHead>宽度</TableHead>
              <TableHead>总吨位</TableHead>
              <TableHead>最大载重量</TableHead>
              <TableHead>最大速度</TableHead>
              <TableHead>最大续航</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>更新时间</TableHead>
              <TableHead>创建时间</TableHead>
              <TableHead className="w-[100px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={13} className="text-center py-10">
                  加载中...
                </TableCell>
              </TableRow>
            ) : (boatTypes?.length || 0) === 0 ? (
              <TableRow>
                <TableCell colSpan={13} className="text-center py-10">
                  暂无数据
                </TableCell>
              </TableRow>
            ) : (
              boatTypes.map((boatType) => (
                <TableRow key={boatType.id}>
                  <TableCell>{boatType.id}</TableCell>
                  <TableCell className="font-medium">
                    {boatType.typeName}
                  </TableCell>
                  <TableCell>{boatType.description}</TableCell>
                  <TableCell>{boatType.length}</TableCell>
                  <TableCell>{boatType.width}</TableCell>
                  <TableCell>{boatType.grossNumber}</TableCell>
                  <TableCell>{boatType.maxLoad}</TableCell>
                  <TableCell>{boatType.maxSpeed}</TableCell>
                  <TableCell>{boatType.maxEndurance}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          boatType.isEnabled
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {boatType.isEnabled ? "启用" : "禁用"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {boatType.createdAt &&
                      format(
                        new Date(boatType.createdAt),
                        "yyyy-MM-dd HH:mm:ss"
                      )}
                  </TableCell>
                  <TableCell>
                    {boatType.updatedAt &&
                      format(
                        new Date(boatType.updatedAt),
                        "yyyy-MM-dd HH:mm:ss"
                      )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(boatType)}>
                          <Pencil className="h-4 w-4 mr-2" />
                          编辑
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatus(boatType.id || 0, !boatType.isEnabled)
                          }
                        >
                          <Ban className="h-4 w-4 mr-2" />
                          {boatType.isEnabled ? "禁用" : "启用"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(boatType.id || 0)}
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
        totalItems={boatTypes?.length || 0}
        onPageChange={setCurrentPage}
      />

      <BoatTypeDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            handleDialogClose(true);
          }
          setIsDialogOpen(open);
        }}
        boatType={selectedBoatType}
      />
    </div>
  );
}
