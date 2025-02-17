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
import { Switch } from "@/components/ui/switch";
import type { API } from "@/services/api/typings";
import { toast } from "sonner";
import { addVendorBoatType, updateVendorBoatType } from "@/services/api/vendorBoatType";

const boatTypeFormSchema = z.object({
  typeName: z.string().min(1, "请输入类型名称"),
  description: z.string().min(1, "请输入描述"),
  length: z.coerce.number().min(0, "长度不能小于0"),
  width: z.coerce.number().min(0, "宽度不能小于0"),
  grossNumber: z.coerce.number().min(0, "总吨位不能小于0"),
  maxLoad: z.coerce.number().min(0, "最大载重不能小于0"),
  maxSpeed: z.coerce.number().min(0, "最大速度不能小于0"),
  maxEndurance: z.coerce.number().min(0, "最大续航不能小于0"),
  isEnabled: z.boolean(),
});

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
  const form = useForm<z.infer<typeof boatTypeFormSchema>>({
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
      isEnabled: boatType?.isEnabled ?? true,
    },
  });

  const onSubmit = async (values: z.infer<typeof boatTypeFormSchema>) => {
    try {
      if (boatType?.id) {
        await updateVendorBoatType({ id: boatType.id }, values);
        toast.success("更新成功");
      } else {
        await addVendorBoatType(values);
        toast.success("添加成功");
      }
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("操作失败");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {boatType ? "编辑船舶类型" : "添加船舶类型"}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="typeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>类型名称</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="请输入类型名称" />
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
                  <FormLabel>长度(m)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="请输入长度" />
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
                  <FormLabel>宽度(m)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="请输入宽度" />
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
                  <FormLabel>总吨位(t)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="请输入总吨位" />
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
                  <FormLabel>最大载重(t)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="请输入最大载重" />
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
                  <FormLabel>最大速度(节)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="请输入最大速度" />
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
                  <FormLabel>最大续航(海里)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="请输入最大续航" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isEnabled"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between py-2">
                  <FormLabel>启用状态</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
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