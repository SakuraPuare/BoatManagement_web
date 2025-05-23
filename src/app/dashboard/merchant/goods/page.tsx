"use client";

import { Package, Pencil, Plus, Trash2 } from "lucide-react";
import type { API } from "@/services/api/typings";
import {
  addMerchantsGoods,
  deleteMerchantsGoods,
  getMerchantGoodsPageQuery,
  updateMerchantsGoods,
} from "@/services/api/merchantGoods";
import { DataManagementTable, type Column, type Action } from "@/components/data-management-table";
import { GoodsFormDialog, goodsFormSchema } from "./goods-form-dialog";
import type { z } from "zod";
import { useState, useCallback, useEffect } from "react";

const ITEMS_PER_PAGE = 10;

export default function MerchantGoodsPage() {
  const [goods, setGoods] = useState<API.BaseGoodsVO[]>([]);
  const [selectedGood, setSelectedGood] = useState<API.BaseGoodsVO | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchGoods = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getMerchantGoodsPageQuery(
        { pageNum: currentPage, pageSize: ITEMS_PER_PAGE },
        {}
      );

      if (response.data?.data?.records) {
        setGoods(response.data.data.records);
        setTotalPages(response.data.data.totalPage || 0);
      } 
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchGoods();
  }, [fetchGoods]);

  const handleAdd = () => {
    setSelectedGood(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (good: API.BaseGoodsVO) => {
    setSelectedGood(good);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMerchantsGoods({ id });
      await fetchGoods();
    } catch (error) {
      console.error(error);
    }
  };

  const columns: Column<API.BaseGoodsVO>[] = [
    { header: "商品名称", accessor: "name" },
    { header: "描述", accessor: "description" },
    { 
      header: "价格", 
      accessor: "price",
      render: (price) => <span>¥{price}</span>,
    },
    { header: "单位", accessor: "unit" },
    { header: "库存", accessor: "stock" },
    { header: "销量", accessor: "sales" },
  ];

  const actions: Action<API.BaseGoodsVO>[] = [
    {
      icon: <Pencil className="h-4 w-4 mr-2" />,
      label: "编辑",
      onClick: handleEdit,
    },
    {
      icon: <Trash2 className="h-4 w-4 mr-2" />,
      label: "删除",
      onClick: (good: API.BaseGoodsVO) => handleDelete(good.id!),
    },
  ];

  return (
    <>
      <DataManagementTable
        title="商品管理"
        icon={<Package className="h-6 w-6" />}
        data={goods}
        isLoading={isLoading}
        columns={columns}
        actions={actions}
        searchPlaceholder="搜索商品..."
        dialog={GoodsFormDialog}
        schema={goodsFormSchema}
        queryFn={async ({ pageNum, pageSize }, searchQuery) => {
          const response = await getMerchantGoodsPageQuery(
            { pageNum, pageSize },
            { name: searchQuery } as API.BaseGoodsDTO
          );
          return {
            list: response.data?.data?.records || [],
            totalItems: response.data?.data?.records?.length || 0,
            totalPages: response.data?.data?.totalPage || 0,
          };
        }}
        pagination={{
          currentPage,
          totalPages,
          totalItems: goods.length,
          onPageChange: setCurrentPage,
        }}
        onAdd={handleAdd}
      />

      <GoodsFormDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            fetchGoods();
          }
          setIsDialogOpen(open);
        }}
        selectedGood={selectedGood}
        onSuccess={fetchGoods}
      />
    </>
  );
} 