"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";
import {
  merchantDeleteGoods,
  merchantGetGoodsPage,
} from "@/services/api/merchantGoods";
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Filter, Page } from "@/components/data-table/types";
import { toast } from "sonner";

import { GoodsFormDialog } from "./goods-form-dialog";

export default function MerchantGoodsPage() {
  // State for data table
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<Page>({
    pageNumber: 1,
    pageSize: 10,
  });
  const [filter, setFilter] = useState<Filter<API.BaseGoodsVO>>({
    filter: {},
    filterOptions: [],
    search: null,
    sort: null,
    startDateTime: null,
    endDateTime: null,
  });
  const [goods, setGoods] = useState<API.BaseGoodsVO[]>([]);

  // State for add/edit goods dialog
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [editingGood, setEditingGood] = useState<API.BaseGoodsVO | null>(null);

  // State for delete confirmation
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  // Fetch goods data
  const fetchGoods = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await merchantGetGoodsPage(
        {
          pageNum: page.pageNumber || 1,
          pageSize: page.pageSize || 10,
          ...(filter.search && { search: filter.search }),
          ...(filter.sort && { sort: filter.sort }),
          ...(filter.startDateTime && { startDateTime: filter.startDateTime }),
          ...(filter.endDateTime && { endDateTime: filter.endDateTime }),
        },
        filter.filter
      );

      if (res.data) {
        const pageData = res.data as API.PageBaseGoodsVO;
        setPage({
          pageNumber: pageData.pageNumber || 1,
          pageSize: pageData.pageSize || 10,
          totalPage: pageData.totalPage,
          totalRow: pageData.totalRow,
        });

        setGoods(pageData.records || []);
      }
    } catch (error) {
      console.error("Failed to fetch goods:", error);
      toast.error("获取商品列表失败");
    } finally {
      setIsLoading(false);
    }
  }, [filter, page.pageNumber, page.pageSize]);

  // Load data on component mount and when dependencies change
  useEffect(() => {
    fetchGoods();
  }, [fetchGoods]);

  // Function to handle opening the add/edit dialog
  const handleOpenAddEditDialog = useCallback((good?: API.BaseGoodsVO) => {
    setEditingGood(good || null);
    setIsAddEditDialogOpen(true);
  }, []);

  // Function to handle goods deletion
  const handleDeleteGood = useCallback(
    async (goodToDelete: API.BaseGoodsVO) => {
      if (!goodToDelete?.id) return;

      setIsDeleting(goodToDelete.id);
      try {
        await merchantDeleteGoods({ id: goodToDelete.id });
        toast.success(`商品 "${goodToDelete.name}" 删除成功`);
        fetchGoods();
      } catch (error) {
        console.error("Failed to delete good:", error);
        toast.error(`删除商品 "${goodToDelete.name}" 失败`);
      } finally {
        setIsDeleting(null);
      }
    },
    [fetchGoods]
  );

  // Table columns definition
  const columns: ColumnDef<API.BaseGoodsVO>[] = [
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
      enableSorting: true,
    },
    {
      id: "name",
      header: "商品名称",
      accessorKey: "name",
      enableSorting: true,
    },
    {
      id: "description",
      header: "描述",
      accessorKey: "description",
      enableSorting: false,
    },
    {
      id: "price",
      header: "价格",
      accessorKey: "price",
      cell: ({ row }) => `¥${row.original.price || 0}`,
      enableSorting: true,
    },
    {
      id: "unit",
      header: "单位",
      accessorKey: "unit",
      enableSorting: false,
    },
    {
      id: "stock",
      header: "库存",
      accessorKey: "stock",
      enableSorting: true,
    },
    {
      id: "sales",
      header: "销量",
      accessorKey: "sales",
      enableSorting: true,
    },
  ];

  // Table row actions
  const actions = [
    {
      label: "编辑",
      icon: <Pencil className="mr-2 h-4 w-4" />,
      onClick: handleOpenAddEditDialog,
      disabled: (row: API.BaseGoodsVO) => isDeleting === row.id,
    },
    {
      label: "删除",
      icon: <Trash2 className="mr-2 h-4 w-4 text-red-500" />,
      onClick: handleDeleteGood,
      className: "text-red-500",
      disabled: (row: API.BaseGoodsVO) => !!isDeleting,
      loading: (row: API.BaseGoodsVO) => isDeleting === row.id,
      loadingText: "删除中...",
    },
  ];

  // Table toolbar actions
  const toolbars = [
    {
      label: "添加商品",
      icon: <PlusCircle />,
      onClick: () => handleOpenAddEditDialog(),
    },
  ];

  return (
    <>
      <GoodsFormDialog
        open={isAddEditDialogOpen}
        onOpenChange={setIsAddEditDialogOpen}
        onSuccess={() => {
          fetchGoods();
        }}
        selectedGood={editingGood}
      />

      <DataTable<API.BaseGoodsVO>
        title="商品管理"
        loading={isLoading}
        columns={columns}
        actions={actions}
        data={goods}
        toolbars={toolbars}
        page={page}
        onPageChange={(pageNumber) => {
          setPage({ ...page, pageNumber });
        }}
        filter={filter}
        onFilterChange={(newFilter) => {
          setFilter(newFilter);
          setPage({ ...page, pageNumber: 1 });
        }}
      />
    </>
  );
}
