"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataPagination } from "@/components/ui/data-pagination";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  adminDeleteVendor,
  adminGetVendorPage,
} from "@/services/api/adminVendor";
import { adminGetUserList } from "@/services/api/adminUser";
import { adminGetUnitList } from "@/services/api/adminUnit";
import { Eye, MoreVertical, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VENDOR_STATUS_MAP } from "@/lib/constants/status";

const ITEMS_PER_PAGE = 10;

type VendorStatus = keyof typeof VENDOR_STATUS_MAP;

type VendorWithDetails = API.BaseVendorsVO & {
  user?: API.BaseAccountsVO;
  unit?: API.BaseUnitsVO;
};

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState<API.BaseVendorsVO[]>([]);
  const [vendorsWithDetails, setVendorsWithDetails] = useState<
    VendorWithDetails[]
  >([]);
  const [users, setUsers] = useState<API.BaseAccountsVO[]>([]);
  const [units, setUnits] = useState<API.BaseUnitsVO[]>([]);
  const [selectedVendor, setSelectedVendor] =
    useState<VendorWithDetails | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"all" | VendorStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [vendorsResponse, usersResponse, unitsResponse] = await Promise.all(
        [
          adminGetVendorPage(
            { pageNum: currentPage, pageSize: ITEMS_PER_PAGE },
            {
              ...(statusFilter !== "all" && { status: statusFilter }),
            }
          ),
          adminGetUserList({}, {}),
          adminGetUnitList({}, {}),
        ]
      );

      if (vendorsResponse.data?.records) {
        setVendors(vendorsResponse.data.records);
        setTotalPages(vendorsResponse.data.totalPage || 0);
      }
      setUsers(usersResponse.data || []);
      setUnits(unitsResponse.data || []);
    } catch (error) {
      console.error(error);
      toast.error("获取供应商列表失败");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, statusFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (users.length > 0 && units.length > 0) {
      const vendorsWithDetails = vendors.map((vendor) => {
        const user = users.find((u) => u.id === vendor.userId);
        const unit = units.find((u) => u.id === vendor.unitId);
        return { ...vendor, user, unit };
      });
      setVendorsWithDetails(vendorsWithDetails);
    }
  }, [vendors, users, units]);

  const handleDelete = async (id: number) => {
    try {
      await adminDeleteVendor({ id });
      toast.success("删除成功");
      await fetchData();
    } catch (error) {
      console.error(error);
      toast.error("删除失败");
    }
  };

  const handleViewDetail = (vendor: VendorWithDetails) => {
    setSelectedVendor(vendor);
    setIsDetailDialogOpen(true);
  };

  const filteredVendors = vendorsWithDetails.filter((vendor) => {
    if (!searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();
    return (
      vendor.user?.username?.toLowerCase().includes(searchLower) ||
      vendor.unit?.name?.toLowerCase().includes(searchLower) ||
      vendor.unit?.unitName?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">供应商管理</h1>
          <p className="text-muted-foreground">管理系统中的供应商信息</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="搜索用户名或单位名称..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>用户</TableHead>
              <TableHead>关联单位</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>创建时间</TableHead>
              <TableHead>更新时间</TableHead>
              <TableHead className="w-[100px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  加载中...
                </TableCell>
              </TableRow>
            ) : filteredVendors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  暂无数据
                </TableCell>
              </TableRow>
            ) : (
              filteredVendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell>{vendor.id}</TableCell>
                  <TableCell>{vendor.user?.username || "-"}</TableCell>
                  <TableCell>
                    {vendor.unit?.name || vendor.unit?.unitName || "-"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        VENDOR_STATUS_MAP[vendor.status as VendorStatus]
                          ?.variant || "outline"
                      }
                    >
                      {VENDOR_STATUS_MAP[vendor.status as VendorStatus]
                        ?.label || vendor.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {vendor.createdAt
                      ? new Date(vendor.createdAt).toLocaleString()
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {vendor.updatedAt
                      ? new Date(vendor.updatedAt).toLocaleString()
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleViewDetail(vendor)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          查看详情
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(vendor.id!)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
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
        onPageChange={setCurrentPage}
      />

      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>供应商详情</DialogTitle>
            <DialogDescription>查看供应商详细信息</DialogDescription>
          </DialogHeader>
          {selectedVendor && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">供应商ID</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedVendor.id}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">用户</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedVendor.user?.username || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">用户邮箱</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedVendor.user?.email || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">用户电话</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedVendor.user?.phone || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">关联单位</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedVendor.unit?.name ||
                      selectedVendor.unit?.unitName ||
                      "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">单位地址</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedVendor.unit?.address || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">联系电话</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedVendor.unit?.contactPhone || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">状态</label>
                  <div className="mt-1">
                    <Badge
                      variant={
                        VENDOR_STATUS_MAP[selectedVendor.status as VendorStatus]
                          ?.variant || "outline"
                      }
                    >
                      {VENDOR_STATUS_MAP[selectedVendor.status as VendorStatus]
                        ?.label || selectedVendor.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">创建时间</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedVendor.createdAt
                      ? new Date(selectedVendor.createdAt).toLocaleString()
                      : "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">更新时间</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedVendor.updatedAt
                      ? new Date(selectedVendor.updatedAt).toLocaleString()
                      : "-"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
