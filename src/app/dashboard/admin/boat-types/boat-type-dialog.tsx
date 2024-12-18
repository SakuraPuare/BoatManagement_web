"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { BoatType } from "@/types/boat-type";
import { toast } from "sonner";
import { createBoatType, updateBoatType } from "@/services/admin/boat-types";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const boatTypeFormSchema = z.object({
  typeName: z
    .string()
    .min(1, "船型名称不能为空")
    .max(50, "船型名称不能超过50个字符"),
  typeCode: z
    .string()
    .min(1, "船型代码不能为空")
    .max(20, "船型代码不能超过20个字符"),
  maxCapacity: z.coerce
    .number()
    .min(1, "最大容量不能小于1")
    .max(10000, "最大容量不能大于10000"),
  maxSpeed: z.coerce
    .number()
    .min(0, "最大速度不能小于0")
    .max(100, "最大速度不能大于100"),
  fuelType: z.string().min(1, "燃料类型不能为空"),
  status: z.number().min(0).max(1),
});

type FormValues = z.infer<typeof boatTypeFormSchema>;

interface BoatTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  boatType: BoatType | null;
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
      typeCode: boatType?.typeCode || "",
      maxCapacity: boatType?.maxCapacity || 1,
      maxSpeed: boatType?.maxSpeed || 0,
      fuelType: boatType?.fuelType || "",
      status: boatType?.status || 1,
    },
    values: {
      typeName: boatType?.typeName || "",
      typeCode: boatType?.typeCode || "",
      maxCapacity: boatType?.maxCapacity || 1,
      maxSpeed: boatType?.maxSpeed || 0,
      fuelType: boatType?.fuelType || "",
      status: boatType?.status || 1,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      if (boatType?.boatTypeId) {
        await updateBoatType(boatType.boatTypeId, values);
      } else {
        await createBoatType(values);
      }
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("操作失败:", error);
      toast.error(
        "操作失败: " + (error instanceof Error ? error.message : "未知错误"),
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
              name="typeCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>船型代码</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="请输入船型代码" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxCapacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>最大容量</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="1"
                      placeholder="请输入最大容量"
                    />
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
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      step="0.1"
                      placeholder="请输入最大速度"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fuelType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>燃料类型</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="请输入燃料类型" />
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
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={field.value === 1}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? 1 : 0)
                        }
                      />
                      <Label>{field.value === 1 ? "启用" : "禁用"}</Label>
                    </div>
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
