"use client";
import React from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { update3 } from "@/services/api/adminBoat";
import type { API } from "@/services/api/typings";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const boatFormSchema = z.object({
  boatName: z.string().min(1, "请输入船名"),
  boatTypeId: z.number().min(1, "请选择船只类型"),

  status: z.number().min(0, "状态不能为负"),
});

interface BoatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  boat: API.BaseBoatsVO | null;
  boatTypes: API.BaseBoatTypesVO[];
  docks: API.BaseDocksVO[];
}

export function BoatDialog({
  open,
  onOpenChange,
  boat,
  boatTypes,
  docks,
}: BoatDialogProps) {
  const form = useForm<z.infer<typeof boatFormSchema>>({
    resolver: zodResolver(boatFormSchema),
    defaultValues: {
      boatName: boat?.name || "",
      boatTypeId: boat?.boatTypeId || 0,
      status: boat?.status || 0,
      registrationNumber: boat?.registrationNumber || "",
      buildYear: boat?.buildYear || new Date().getFullYear(),
      nextMaintenance: boat?.nextMaintenance
        ? new Date(boat.nextMaintenance)
        : new Date(0),
      currentDockId: boat?.currentDockId || 0,
    },
    values: {
      boatName: boat?.boatName || "",
      boatTypeId: boat?.boatTypeId || 0,
      status: boat?.status || 0,
      registrationNumber: boat?.registrationNumber || "",
      buildYear: boat?.buildYear || new Date().getFullYear(),
      nextMaintenance: boat?.nextMaintenance
        ? new Date(boat.nextMaintenance)
        : new Date(0),
      currentDockId: boat?.currentDockId || 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof boatFormSchema>) => {
    const boatType = boatTypes.find(
      (type) => type.boatTypeId === Number(values.boatTypeId),
    );
    if (!boatType) {
      toast.error("船只类型不存在");
      return;
    }
    try {
      if (boat?.id) {
        await update3(
          { id: boat.id },
          {
            ...values,
            boatTypeId: boatType.boatTypeId,
          },
        );
      }
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
            {boat?.id ? "编辑船只" : "添加船只"}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="boatName"
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
              name="boatTypeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>船只类型</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="选择船只类型" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {boatTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id.toString()}>
                          {type.typeName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="registrationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>注册号</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="请输入注册号" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="buildYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>建造年份</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      placeholder="请输入建造年份"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currentDockId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>当前港口</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="选择港口" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {docks.map((dock) => (
                        <SelectItem key={dock.id} value={dock.id.toString()}>
                          {dock.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nextMaintenance"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>下次维护时间</FormLabel>

                  <Popover modal={true}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : (
                            <span>选择日期</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : new Date(0)
                        }
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
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
                  : boat?.boatId
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
