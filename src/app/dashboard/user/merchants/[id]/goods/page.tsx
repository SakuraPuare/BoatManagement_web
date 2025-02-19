"use client";

import { Package } from "lucide-react";
import type { API } from "@/services/api/typings";
import { 
  getUserMerchantGoodsPage,
  createUserMerchantGoodsOrder 
} from "@/services/api/userMerchant";
import { DataManagementTable, type Column, type TableRow } from "@/components/data-management-table";
import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const orderFormSchema = z.object({
  quantity: z.string().min(1, "请输入购买数量"),
});

export default function MerchantGoodsPage() {
  const params = useParams();
  const merchantId = params.id as string;
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

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
      accessor: "id.",
      header: "操作",
      render: useCallback((_: any, row?: TableRow<API.BaseGoodsVO>) => {
        if (!row) return null;
        const { id, stock, name } = row.data;
        const [isDialogOpen, setIsDialogOpen] = useState(false);

        const form = useForm<z.infer<typeof orderFormSchema>>({
          resolver: zodResolver(orderFormSchema),
          defaultValues: {
            quantity: "1",
          },
        });

        const onSubmit = async (values: z.infer<typeof orderFormSchema>) => {
          try {
            const quantity = parseInt(values.quantity);
            if (quantity > stock!) {
              toast.error("购买数量不能大于库存");
              return;
            }

            await createUserMerchantGoodsOrder(
              { merchantId: parseInt(merchantId) },
              {
                orderInfo: {
                  goodsId: id,
                  quantity
                }
              }
            );
            toast.success("下单成功");
            setIsDialogOpen(false);
            form.reset();
            window.location.reload();
          } catch (error) {
            toast.error("下单失败");
          }
        };

        return (
          <>
            <Button
              variant="default"
              size="sm"
              disabled={stock === 0}
              onClick={() => setIsDialogOpen(true)}
            >
              {stock === 0 ? "已售罄" : "购买"}
            </Button>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>购买 {name}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>购买数量 (库存: {stock})</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" min="1" max={stock} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        取消
                      </Button>
                      <Button type="submit">确认购买</Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </>
        );
      }, [merchantId]),
    },
  ];

  return (
    <DataManagementTable
      title="商品列表"
      icon={<Package className="h-6 w-6" />}
      columns={columns}
      isLoading={isLoading}
      searchPlaceholder="搜索商品..."
      queryFn={async ({ pageNum, pageSize }, searchQuery) => {
        if (!merchantId) return { list: [], totalItems: 0, totalPages: 0 };
        
        const response = await getUserMerchantGoodsPage(
          { merchantId: parseInt(merchantId), pageNum, pageSize },
          { name: searchQuery }
        );
        return {
          list: response.data?.data?.records || [],
          totalItems: response.data?.data?.records?.length || 0,
          totalPages: response.data?.data?.totalPage || 0,
        };
      }}
      pagination={{
        currentPage,
        totalPages: 1,
        totalItems: 0,
        onPageChange: setCurrentPage,
      }}
    />
  );
} 