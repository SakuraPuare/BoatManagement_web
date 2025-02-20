"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createAdminMerchant,
  updateAdminMerchant,
} from "@/services/api/adminMerchant";
import type { API } from "@/services/api/typings";
import { MERCHANT_CERTIFY_STATUS_MAP } from "@/lib/constants/status";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export const merchantFormSchema = z.object({
  userId: z.number().min(1, "用户ID不能为空"),
  unitId: z.number().min(1, "单位ID不能为空"),
  status: z.enum(["PENDING", "APPROVED", "REJECTED"] as const).default("PENDING"),
});

type FormValues = z.infer<typeof merchantFormSchema>;

interface MerchantDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  merchant: API.BaseMerchantsVO | null;
}

export function MerchantDialog({
  open,
  onOpenChange,
  merchant,
}: MerchantDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(merchantFormSchema),
    defaultValues: {
      userId: 0,
      unitId: 0,
      status: "PENDING",
    },
    values: {
      userId: merchant?.userId || 0,
      unitId: merchant?.unitId || 0,
      status: (merchant?.status as "PENDING" | "APPROVED" | "REJECTED") || "PENDING",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      if (merchant?.id) {
        await updateAdminMerchant({ id: merchant.id }, values);
      } else {
        await createAdminMerchant(values);
      }
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("操作失败:", error);
      toast.error(
        "操作失败: " + (error instanceof Error ? error.message : "未知错误")
      );
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {merchant ? "编辑商户" : "添加商户"}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>用户ID</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="请输入用户ID" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unitId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>单位ID</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="请输入单位ID" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>状态</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="选择状态" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(MERCHANT_CERTIFY_STATUS_MAP).map(([value, config]) => (
                        <SelectItem key={value} value={value}>
                          {config.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <Button type="submit">保存</Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
} 