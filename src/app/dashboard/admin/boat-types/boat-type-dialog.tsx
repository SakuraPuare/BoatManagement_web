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
  adminCreateBoatType,
  adminUpdateBoatType,
} from "@/services/api/adminBoatType";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const boatTypeFormSchema = z.object({
  typeName: z
    .string()
    .min(1, "船型名称不能为空")
    .max(50, "船型名称不能超过50个字符"),
  description: z
    .string()
    .min(1, "船只描述不能为空")
    .max(200, "船只描述不能超过200个字符"),
  length: z.coerce
    .number()
    .min(1, "长度不能小于1")
    .max(10000, "长度不能大于10000"),
  width: z.coerce.number().min(0, "宽度不能小于0").max(100, "宽度不能大于100"),
  grossNumber: z.coerce
    .number()
    .min(1, "总吨位不能小于1")
    .max(10000, "总吨位不能大于10000"),
  maxLoad: z.coerce
    .number()
    .min(0, "最大载重量不能小于0")
    .max(10000, "最大载重量不能大于10000"),
  maxSpeed: z.coerce
    .number()
    .min(0, "最大速度不能小于0")
    .max(100, "最大速度不能大于100"),
  maxEndurance: z.coerce.number().min(0, "最大续航不能小于0"),
});

type FormValues = z.infer<typeof boatTypeFormSchema>;

interface BoatTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  boatType: API.BaseBoatTypesVO | null;
}

export function BoatTypeDialog({
  open,
  onOpenChange,
  boatType,
}: BoatTypeDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(boatTypeFormSchema),
    defaultValues: {
      typeName: boatType?.typeName || "",
      description: boatType?.description || "",
      length: boatType?.length || 0,
      width: boatType?.width || 0,
      grossNumber: boatType?.grossNumber || 0,
      maxLoad: boatType?.maxLoad || 0,
      maxSpeed: boatType?.maxSpeed || 0,
      maxEndurance: boatType?.maxEndurance || 0,
    },
    values: {
      typeName: boatType?.typeName || "",
      description: boatType?.description || "",
      length: boatType?.length || 0,
      width: boatType?.width || 0,
      grossNumber: boatType?.grossNumber || 0,
      maxLoad: boatType?.maxLoad || 0,
      maxSpeed: boatType?.maxSpeed || 0,
      maxEndurance: boatType?.maxEndurance || 0,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      if (boatType?.id) {
        await adminUpdateBoatType({ id: boatType.id }, values);
      } else {
        await adminCreateBoatType(values);
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
            {boatType ? "编辑船型" : "添加船型"}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="typeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>船型名称</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="请输入船型名称" />
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
                  <FormLabel>描述</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="请输入描述" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="length"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>长度</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="1"
                      placeholder="请输入长度"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="width"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>宽度</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      step="0.1"
                      placeholder="请输入宽度"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="grossNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>总吨位</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="请输入总吨位" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxLoad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>最大载重量</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="请输入最大载重量" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxSpeed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>最大速度</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="请输入最大速度" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxEndurance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>最大续航</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="请输入最大续航" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                type="button"
              >
                取消
              </Button>
              <Button type="submit">
                {form.formState.isSubmitting
                  ? "提交中..."
                  : boatType
                  ? "更新"
                  : "创建"}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
