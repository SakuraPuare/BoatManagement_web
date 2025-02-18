"use client";

import { Package } from "lucide-react";
import type { API } from "@/services/api/typings";
import {
  addMerchantsGoods,
  deleteMerchantsGoods,
  getMerchantGoodsPageQuery,
  updateMerchantsGoods,
} from "@/services/api/merchantGoods";
import { DataManagementTable, type Column, type TableRow } from "@/components/data-management-table";
import { GoodsFormDialog, goodsFormSchema } from "./goods-form-dialog";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import type { z } from "zod";

const columns: Column<API.BaseGoodsVO>[] = [
  {
    accessor: "name",
    header: "商品名称",
  },
  {
    accessor: "description",
    header: "描述",
  },
  {
    accessor: "price",
    header: "价格",
    render: (price) => <span>¥{price}</span>,
  },
  {
    accessor: "unit",
    header: "单位",
  },
  {
    accessor: "stock",
    header: "库存",
  },
  {
    accessor: "sales",
    header: "销量",
  },
  {
    accessor: "id",
    header: "操作",
    render: (_: any, row?: TableRow<API.BaseGoodsVO>) => {
      if (!row) return null;
      return (
        <div className="flex justify-end space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => row.handleEdit?.(row.data)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => row.handleDelete?.(row.data.id!)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];

interface QueryParams {
  pageNum: number;
  pageSize: number;
}

export default function MerchantGoodsPage() {
  return (
    <DataManagementTable<API.BaseGoodsVO>
      title="商品管理"
      icon={<Package className="h-6 w-6" />}
      columns={columns}
      searchPlaceholder="搜索商品..."
      dialog={GoodsFormDialog}
      schema={goodsFormSchema}
      queryFn={async ({ pageNum, pageSize }: QueryParams, searchQuery: string) => {
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
      addFn={async (data: z.infer<typeof goodsFormSchema>) => {
        await addMerchantsGoods({
          ...data,
          price: parseFloat(data.price),
        });
      }}
      updateFn={async (id: number, data: z.infer<typeof goodsFormSchema>) => {
        await updateMerchantsGoods(
          { id },
          {
            ...data,
            price: parseFloat(data.price),
          }
        );
      }}
      deleteFn={async (id: number) => {
        await deleteMerchantsGoods({ id });
      }}
      deleteConfirmMessage="确定要删除这个商品吗？"
      addSuccessMessage="添加成功"
      updateSuccessMessage="更新成功"
      deleteSuccessMessage="删除成功"
      queryErrorMessage="获取商品列表失败"
      addErrorMessage="添加失败"
      updateErrorMessage="更新失败"
      deleteErrorMessage="删除失败"
    />
  );
} 