"use client";

import { Package } from "lucide-react";
import type { API } from "@/services/api/typings";
import { 
  getUserMerchantGoodsPage,
  createUserMerchantGoodsOrder 
} from "@/services/api/userMerchant";
import { DataManagementTable, type Column, type TableRow } from "@/components/data-management-table";
import React, { useState, useCallback, useEffect } from "react";
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

// 将购买对话框提取为单独的组件
function PurchaseDialog({
  open,
  onOpenChange,
  good,
  merchantId,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  good: API.BaseGoodsVO;
  merchantId: string;
  onSuccess: () => void;
}) {
  const form = useForm<z.infer<typeof orderFormSchema>>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      quantity: "1",
    },
  });

  const onSubmit = async (values: z.infer<typeof orderFormSchema>) => {
    try {
      const quantity = parseInt(values.quantity);
      if (quantity > good.stock!) {
        toast.error("购买数量不能大于库存");
        return;
      }

      const response = await createUserMerchantGoodsOrder(
        { merchantId: parseInt(merchantId) },
        {
          orderInfo: {
            [good.id!]: quantity
          }
        }
      );

      if (response.data?.code === 200) {
        toast.success("下单成功");
        onOpenChange(false);
        form.reset();
        onSuccess();
      } else {
        toast.error("下单失败", {
          description: response.data?.message,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("下单失败");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>购买 {good.name}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>购买数量 (库存: {good.stock})</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min="1" max={good.stock} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                取消
              </Button>
              <Button type="submit">确认购买</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default function MerchantGoodsPage() {
  const params = useParams();
  const merchantId = params.id as string;
  const [goods, setGoods] = useState<API.BaseGoodsVO[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGood, setSelectedGood] = useState<API.BaseGoodsVO | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchGoods = useCallback(async () => {
    if (!merchantId) return;
    setIsLoading(true);
    try {
      const response = await getUserMerchantGoodsPage(
        { merchantId: parseInt(merchantId), pageNum: currentPage, pageSize: 10 },
        { name: searchQuery }
      );
      console.log(response.data);
      if (response.data?.data?.records) {
        setGoods(response.data.data.records);
        setTotalPages(response.data.data.totalPage || 0);
      }
    } catch (error) {
      console.error(error);
      toast.error("获取商品列表失败");
    } finally {
      setIsLoading(false);
    }
  }, [merchantId, currentPage, searchQuery]);

  useEffect(() => {
    fetchGoods();
  }, [fetchGoods]);

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
      render: (_, row?: TableRow<API.BaseGoodsVO>) => {
        if (!row) return null;
        const { stock } = row.data;
        
        return (
          <Button
            variant="default"
            size="sm"
            disabled={stock === 0}
            onClick={() => {
              setSelectedGood(row.data);
              setIsDialogOpen(true);
            }}
          >
            {stock === 0 ? "已售罄" : "购买"}
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <DataManagementTable
        title="商品列表"
        icon={<Package className="h-6 w-6" />}
        data={goods}
        columns={columns}
        isLoading={isLoading}
        searchPlaceholder="搜索商品..."
        onSearch={setSearchQuery}
        pagination={{
          currentPage,
          totalPages,
          totalItems: goods.length,
          onPageChange: setCurrentPage,
        }}
      />

      {selectedGood && (
        <PurchaseDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          good={selectedGood}
          merchantId={merchantId}
          onSuccess={fetchGoods}
        />
      )}
    </>
  );
} 