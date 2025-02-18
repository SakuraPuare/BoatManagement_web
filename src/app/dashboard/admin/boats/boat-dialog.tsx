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
import { updateAdminBoat } from "@/services/api/adminBoat";
import type { API } from "@/services/api/typings";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export const boatFormSchema = z.object({
  name: z.string().min(1, "请输入船名"),
  typeId: z.number().min(1, "请选择船只类型"),
  dockId: z.number().min(1, "请选择码头"),
});

interface BoatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  boat: API.BaseBoatsVO | null;
  boatTypes: API.BaseBoatTypesVO[];
  docks: API.BaseDocksVO[];
  onOpenBoatTypeDialog?: () => void;
}

export function BoatDialog({
  open,
  onOpenChange,
  boat,
  boatTypes,
  docks,
  onOpenBoatTypeDialog,
}: BoatDialogProps) {
  const form = useForm<z.infer<typeof boatFormSchema>>({
    resolver: zodResolver(boatFormSchema),
    defaultValues: {
      name: boat?.name || "",
      typeId: boat?.typeId || 0,
      dockId: boat?.dockId || 0,
    },
    values: {
      name: boat?.name || "",
      typeId: boat?.typeId || 0,
      dockId: boat?.dockId || 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof boatFormSchema>) => {
    const boatType = boatTypes.find(
      (type) => type.id === Number(values.typeId)
    );
    if (!boatType) {
      toast.error("船只类型不存在");
      return;
    }
    try {
      if (boat?.id) {
        await updateAdminBoat({ id: boat.id }, values);
      }
      onOpenChange(false);
      toast.success(boat?.id ? "更新成功" : "创建成功");
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
            {boat?.id ? "编辑船只" : "添加船只"}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>船名</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="请输入船名" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="typeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>船只类型</FormLabel>
                  <div className="flex gap-2">
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="选择船只类型" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {boatTypes.map((type) => (
                          <SelectItem
                            key={type.id}
                            value={type.id?.toString() || ""}
                          >
                            {type.typeName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {onOpenBoatTypeDialog && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          onOpenBoatTypeDialog();
                          onOpenChange(false);
                        }}
                      >
                        新增类型
                      </Button>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dockId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>所属码头</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="选择码头" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {docks.map((dock) => (
                        <SelectItem
                          key={dock.id}
                          value={dock.id?.toString() || ""}
                        >
                          {dock.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  : boat?.id
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
