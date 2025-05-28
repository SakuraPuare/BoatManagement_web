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
import { adminDeleteGoods, adminGetGoodsPage } from "@/services/api/adminGoods";
import { adminGetMerchantList } from "@/services/api/adminMerchant";
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

const ITEMS_PER_PAGE = 10;

type GoodsWithDetails = API.BaseGoodsVO & {
  merchant?: API.BaseMerchantsVO;
  unitInfo?: API.BaseUnitsVO;
};

export default function AdminGoodsPage() {
  const [goods, setGoods] = useState<API.BaseGoodsVO[]>([]);
  const [goodsWithDetails, setGoodsWithDetails] = useState<GoodsWithDetails[]>(
    []
  );
  const [merchants, setMerchants] = useState<API.BaseMerchantsVO[]>([]);
  const [units, setUnits] = useState<API.BaseUnitsVO[]>([]);
  const [selectedGoods, setSelectedGoods] = useState<GoodsWithDetails | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "enabled" | "disabled"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [goodsResponse, merchantsResponse, unitsResponse] =
        await Promise.all([
          adminGetGoodsPage(
            { pageNum: currentPage, pageSize: ITEMS_PER_PAGE },
            {
              ...(statusFilter === "enabled" && { isEnabled: true }),
              ...(statusFilter === "disabled" && { isEnabled: false }),
            }
          ),
          adminGetMerchantList({}, {}),
          adminGetUnitList({}, {}),
        ]);

      if (goodsResponse.data) {
        const pageData = goodsResponse.data as API.PageBaseGoodsVO;
        setGoods(pageData.records || []);
        setTotalPages(pageData.totalPage || 0);
      }
      setMerchants(merchantsResponse.data as API.BaseMerchantsVO[]);
      setUnits(unitsResponse.data as API.BaseUnitsVO[]);
    } catch (error) {
      console.error(error);
      toast.error("获取商品列表失败");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, statusFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (goods.length > 0) {
      const goodsWithDetails = goods.map((item) => {
        const merchant = merchants.find((m) => m.id === item.merchantId);
        const unitInfo = units.find((u) => u.id === item.unitId);
        return { ...item, merchant, unitInfo };
      });
      setGoodsWithDetails(goodsWithDetails);
    } else {
      setGoodsWithDetails([]);
    }
  }, [goods, merchants, units]);

  const handleDelete = async (id: number) => {
    try {
      await adminDeleteGoods({ id });
      toast.success("删除成功");
      await fetchData();
    } catch (error) {
      console.error(error);
      toast.error("删除失败");
    }
  };

  const handleViewDetail = (goods: GoodsWithDetails) => {
    setSelectedGoods(goods);
    setIsDetailDialogOpen(true);
  };

  const filteredGoods = goodsWithDetails.filter((item) => {
    if (!searchQuery || !searchQuery.trim()) return true;
    const searchLower = searchQuery.toLowerCase();
    return (
      (item.name && item.name.toLowerCase().includes(searchLower)) ||
      (item.description &&
        item.description.toLowerCase().includes(searchLower)) ||
      (item.unitInfo?.name &&
        item.unitInfo.name.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">商品管理</h1>
          <p className="text-muted-foreground">管理系统中的所有商品信息</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="搜索商品名称或描述..."
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
              <TableHead>商品名称</TableHead>
              <TableHead>价格</TableHead>
              <TableHead>单位</TableHead>
              <TableHead>库存</TableHead>
              <TableHead>销量</TableHead>
              <TableHead>商家</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>创建时间</TableHead>
              <TableHead className="w-[100px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-10">
                  加载中...
                </TableCell>
              </TableRow>
            ) : filteredGoods.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-10">
                  暂无数据
                </TableCell>
              </TableRow>
            ) : (
              filteredGoods.map((item, index) => (
                <TableRow key={item.id || `goods-${index}`}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    ¥{item.price && true ? item.price.toFixed(2) : "0.00"}
                  </TableCell>
                  <TableCell>{item.unit || "-"}</TableCell>
                  <TableCell>{item.stock || 0}</TableCell>
                  <TableCell>{item.sales || 0}</TableCell>
                  <TableCell>{item.unitInfo?.name || "-"}</TableCell>
                  <TableCell>
                    <Badge variant={item.isEnabled ? "default" : "secondary"}>
                      {item.isEnabled ? "启用" : "禁用"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleString()
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
                          onClick={() => handleViewDetail(item)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          查看详情
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => item.id && handleDelete(item.id)}
                          className="text-red-600"
                          disabled={!item.id}
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
        totalItems={filteredGoods.length}
        onPageChange={setCurrentPage}
      />

      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>商品详情</DialogTitle>
            <DialogDescription>查看商品详细信息</DialogDescription>
          </DialogHeader>
          {selectedGoods && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">商品ID</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedGoods.id}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">商品名称</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedGoods.name}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">价格</label>
                  <p className="text-sm text-muted-foreground">
                    ¥
                    {selectedGoods.price && true
                      ? selectedGoods.price.toFixed(2)
                      : "0.00"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">单位</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedGoods.unit || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">库存</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedGoods.stock || 0}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">销量</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedGoods.sales || 0}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">商家ID</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedGoods.merchantId || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">关联单位</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedGoods.unitInfo?.name || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">状态</label>
                  <div className="mt-1">
                    <Badge
                      variant={
                        selectedGoods.isEnabled ? "default" : "secondary"
                      }
                    >
                      {selectedGoods.isEnabled ? "启用" : "禁用"}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">创建时间</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedGoods.createdAt
                      ? new Date(selectedGoods.createdAt).toLocaleString()
                      : "-"}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">商品描述</label>
                <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">
                  {selectedGoods.description || "-"}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
