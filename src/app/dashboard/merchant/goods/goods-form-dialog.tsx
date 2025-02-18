"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "@/components/ui/button";
import type { API } from "@/services/api/typings";

const goodsFormSchema = z.object({
  name: z.string().min(1, "商品名称不能为空"),
  description: z.string().min(1, "商品描述不能为空"),
  price: z.string().min(1, "价格不能为空"),
  stock: z.string().min(1, "库存不能为空"),
  unit: z.string().min(1, "单位不能为空"),
});

type GoodsFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedGood: API.BaseGoodsVO | null;
  onSubmit: (values: z.infer<typeof goodsFormSchema>) => Promise<void>;
};

export function GoodsFormDialog({
  open,
  onOpenChange,
  selectedGood,
  onSubmit,
}: GoodsFormDialogProps) {
  const form = useForm<z.infer<typeof goodsFormSchema>>({
    resolver: zodResolver(goodsFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      stock: "",
      unit: "",
    },
  });

  // 当 selectedGood 改变时，更新表单值
  useEffect(() => {
    if (selectedGood) {
      form.reset({
        name: selectedGood.name || "",
        description: selectedGood.description || "",
        price: selectedGood.price?.toString() || "",
        stock: selectedGood.stock?.toString() || "",
        unit: selectedGood.unit || "",
      });
    } else {
      form.reset({
        name: "",
        description: "",
        price: "",
        stock: "",
        unit: "",
      });
    }
  }, [selectedGood, form]);

  // 当对话框关闭时，重置表单
  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{selectedGood ? "编辑商品" : "添加商品"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>商品名称</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>商品描述</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>价格</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" step="0.01" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>单位</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="如: 个、件、箱" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>库存</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
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
              <Button type="submit">{selectedGood ? "更新" : "添加"}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export type { GoodsFormDialogProps };
export { goodsFormSchema }; 