"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Package } from "lucide-react";
import {
  createUserMerchantGoodsOrder,
  getUserMerchantGoodsPage,
} from "@/services/api/userMerchant";
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Filter, Page } from "@/components/data-table/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { userCheckIsMerchant } from "@/services/api/userInfo";
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
            [good.id!]: quantity,
          },
        }
      );

      if (response.code === 200) {
        toast.success("下单成功");
        onOpenChange(false);
        form.reset();
        onSuccess();
      } else {
        toast.error("下单失败", {
          description: response.message,
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
  const { user } = useAuth();

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

  // State for purchase dialog
  const [selectedGood, setSelectedGood] = useState<API.BaseGoodsVO | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMerchantOwner, setIsMerchantOwner] = useState(false);

  // 检查当前用户是否是这个商家的所有者
  const checkMerchantOwnership = useCallback(async () => {
    if (!user || !merchantId) return;
    try {
      const response = await userCheckIsMerchant({
        merchantId: parseInt(merchantId, 10),
      });
      setIsMerchantOwner(!!response.data);
    } catch (error) {
      console.error("检查商家所有权失败:", error);
      setIsMerchantOwner(false);
    }
  }, [user, merchantId]);

  const fetchGoods = useCallback(async () => {
    if (!merchantId) return;
    setIsLoading(true);
    try {
      const response = await getUserMerchantGoodsPage(
        {
          merchantId: parseInt(merchantId, 10),
          pageNum: page.pageNumber || 1,
          pageSize: page.pageSize || 10,
          ...(filter.search && { search: filter.search }),
          ...(filter.sort && { sort: filter.sort }),
          ...(filter.startDateTime && { startDateTime: filter.startDateTime }),
          ...(filter.endDateTime && { endDateTime: filter.endDateTime }),
        },
        filter.filter
      );

      if (response.data) {
        const pageData = response.data as API.PageBaseGoodsVO;
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
  }, [merchantId, filter, page.pageNumber, page.pageSize]);

  useEffect(() => {
    fetchGoods();
    checkMerchantOwnership();
  }, [fetchGoods, checkMerchantOwnership]);

  // 处理购买商品
  const handlePurchaseGood = useCallback((good: API.BaseGoodsVO) => {
    setSelectedGood(good);
    setIsDialogOpen(true);
  }, []);

  // Table columns definition
  const columns: ColumnDef<API.BaseGoodsVO>[] = [
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
      id: "actions",
      header: "操作",
      cell: ({ row }) => {
        const good = row.original;
        const { stock } = good;

        // 如果库存为0，显示已售罄
        if (stock === 0) {
          return (
            <Button variant="default" size="sm" disabled>
              已售罄
            </Button>
          );
        }

        // 如果用户是这个商家的所有者，显示提示信息
        if (isMerchantOwner) {
          return (
            <Button
              variant="outline"
              size="sm"
              disabled
              title="商家不能购买商品"
            >
              商家账户
            </Button>
          );
        }

        // 普通用户显示购买按钮
        return (
          <Button
            variant="default"
            size="sm"
            onClick={() => handlePurchaseGood(good)}
          >
            购买
          </Button>
        );
      },
      enableSorting: false,
    },
  ];

  return (
    <>
      <DataTable<API.BaseGoodsVO>
        title="商品列表"
        description={
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6" />
            <span>查看商家的商品并进行购买</span>
          </div>
        }
        loading={isLoading}
        columns={columns}
        data={goods}
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
